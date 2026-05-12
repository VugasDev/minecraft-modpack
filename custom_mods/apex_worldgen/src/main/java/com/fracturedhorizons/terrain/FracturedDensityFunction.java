package com.fracturedhorizons.terrain;

import com.fracturedhorizons.config.SkyIslandConfig;
import com.mojang.serialization.MapCodec;
import com.mojang.serialization.codecs.RecordCodecBuilder;
import net.minecraft.util.KeyDispatchDataCodec;
import net.minecraft.world.level.levelgen.DensityFunction;

public class FracturedDensityFunction implements DensityFunction {

    public static final MapCodec<FracturedDensityFunction> CODEC = RecordCodecBuilder.mapCodec(instance -> instance.group(
            DensityFunction.HOLDER_HELPER_CODEC.fieldOf("input").forGetter(FracturedDensityFunction::input),
            FracturedGeneratorSettings.CODEC.fieldOf("settings").forGetter(FracturedDensityFunction::settings)
    ).apply(instance, FracturedDensityFunction::new));

    public static final KeyDispatchDataCodec<FracturedDensityFunction> DATA_CODEC = KeyDispatchDataCodec.of(CODEC);

    private final DensityFunction input;
    private final FracturedGeneratorSettings settings;
    private final SkyIslandConfig config;
    private final ZoneResolver zoneResolver;
    private final OuterIslandLocator islandLocator;
    private final IslandShapeSampler shapeSampler;

    public FracturedDensityFunction(DensityFunction input, FracturedGeneratorSettings settings) {
        this.input = input;
        this.settings = settings;
        this.config = new SkyIslandConfig();
        this.zoneResolver = new ZoneResolver(config);
        this.islandLocator = new OuterIslandLocator(config, 123456789L); 
        this.shapeSampler = new IslandShapeSampler(config);
    }

    public DensityFunction input() {
        return input;
    }

    public FracturedGeneratorSettings settings() {
        return settings;
    }

    @Override
    public double compute(FunctionContext context) {
        return evaluateDensity(context.blockX(), context.blockY(), context.blockZ(), input.compute(context));
    }

    @Override
    public void fillArray(double[] array, ContextProvider contextProvider) {
        int x = contextProvider.forIndex(0).blockX();
        int z = contextProvider.forIndex(0).blockZ();
        
        double distSq = (double)x * x + z * z;
        Zone zone = zoneResolver.resolveZone(distSq);
        
        double distFromCenter = -1;
        IslandInstance cachedIsland = null;
        
        if (zone == Zone.MAIN_CORE || zone == Zone.MAIN_FADE) {
            distFromCenter = Math.sqrt(distSq);
        } else if (zone == Zone.OUTER) {
            cachedIsland = islandLocator.getInfluencingIsland(x, z);
        }

        for (int i = 0; i < array.length; ++i) {
            FunctionContext ctx = contextProvider.forIndex(i);
            int y = ctx.blockY();
            
            if (zone == Zone.BUFFER) {
                array[i] = -100.0; // Garantierte Leere
                continue;
            }
            
            double sdfBase = 0.0;
            
            if (zone == Zone.MAIN_CORE || zone == Zone.MAIN_FADE) {
                sdfBase = shapeSampler.getMainBaseShape(x, y, z, distFromCenter);
            } else if (zone == Zone.OUTER) {
                if (cachedIsland == null) {
                    array[i] = -100.0;
                    continue;
                }
                sdfBase = shapeSampler.getOuterBaseShape(x, y, z, cachedIsland);
            }
            
            // VOID-KUGELN FIX: Hartes Clamping!
            // Wenn die SDF-Basis deutlich unter 0 fällt, erzwingen wir tiefes negatives Density.
            // Vanilla-Noise darf nur in einem bestimmten Pufferbereich (z.B. > -0.4) um den Nullpunkt 
            // herum die Kanten verzerren, aber er darf nicht weit draußen im Void greifen.
            if (sdfBase < -0.4) {
                array[i] = -100.0; 
            } else {
                double originalNoise = input.compute(ctx);
                array[i] = sdfBase + (originalNoise * 0.4); 
            }
        }
    }

    private double evaluateDensity(int x, int y, int z, double originalNoise) {
        double distSq = (double)x * x + z * z;
        Zone zone = zoneResolver.resolveZone(distSq);
        
        if (zone == Zone.BUFFER) return -100.0;
        
        double sdfBase = 0.0;
        
        if (zone == Zone.MAIN_CORE || zone == Zone.MAIN_FADE) {
            double distFromCenter = Math.sqrt(distSq);
            sdfBase = shapeSampler.getMainBaseShape(x, y, z, distFromCenter);
        } else if (zone == Zone.OUTER) {
            IslandInstance island = islandLocator.getInfluencingIsland(x, z);
            if (island == null) return -100.0;
            sdfBase = shapeSampler.getOuterBaseShape(x, y, z, island);
        }
        
        if (sdfBase < -0.4) {
            return -100.0;
        }
        return sdfBase + (originalNoise * 0.4);
    }

    @Override
    public DensityFunction mapAll(Visitor visitor) {
        return visitor.apply(new FracturedDensityFunction(input.mapAll(visitor), settings));
    }

    @Override
    public double minValue() {
        return -100.0; 
    }

    @Override
    public double maxValue() {
        return input.maxValue() + 2.0; 
    }

    @Override
    public KeyDispatchDataCodec<? extends DensityFunction> codec() {
        return DATA_CODEC;
    }
}
