package com.fracturedhorizons.terrain;

import com.mojang.serialization.MapCodec;
import com.mojang.serialization.codecs.RecordCodecBuilder;
import net.minecraft.core.Holder;
import net.minecraft.world.level.biome.BiomeSource;
import net.minecraft.world.level.chunk.ChunkGenerator;
import net.minecraft.world.level.levelgen.NoiseBasedChunkGenerator;
import net.minecraft.world.level.levelgen.NoiseGeneratorSettings;
import net.minecraft.world.level.chunk.ChunkAccess;

public class FracturedChunkGenerator extends NoiseBasedChunkGenerator {
    
    public static final MapCodec<FracturedChunkGenerator> CODEC = RecordCodecBuilder.mapCodec(instance -> instance.group(
            BiomeSource.CODEC.fieldOf("biome_source").forGetter(ChunkGenerator::getBiomeSource),
            NoiseGeneratorSettings.CODEC.fieldOf("settings").forGetter(NoiseBasedChunkGenerator::generatorSettings),
            FracturedGeneratorSettings.CODEC.fieldOf("fractured_settings").forGetter(FracturedChunkGenerator::getFracturedSettings)
    ).apply(instance, instance.stable(FracturedChunkGenerator::new)));

    private final FracturedGeneratorSettings fracturedSettings;

    public FracturedChunkGenerator(BiomeSource biomeSource, Holder<NoiseGeneratorSettings> settings, FracturedGeneratorSettings fracturedSettings) {
        super(biomeSource, settings);
        this.fracturedSettings = fracturedSettings;
    }

    public FracturedGeneratorSettings getFracturedSettings() {
        return fracturedSettings;
    }

    @Override
    protected MapCodec<? extends ChunkGenerator> codec() {
        return CODEC;
    }

    @Override
    public java.util.concurrent.CompletableFuture<ChunkAccess> fillFromNoise(net.minecraft.world.level.levelgen.blending.Blender blender, net.minecraft.world.level.levelgen.RandomState randomState, net.minecraft.world.level.StructureManager structureManager, ChunkAccess chunkAccess) {
        return super.fillFromNoise(blender, randomState, structureManager, chunkAccess);
    }

    @Override
    public void buildSurface(net.minecraft.server.level.WorldGenRegion region, net.minecraft.world.level.StructureManager structureManager, net.minecraft.world.level.levelgen.RandomState randomState, ChunkAccess chunk) {
        super.buildSurface(region, structureManager, randomState, chunk);
    }
}
