package com.fracturedhorizons.terrain;

import com.fracturedhorizons.config.SkyIslandConfig;
import it.unimi.dsi.fastutil.longs.Long2ObjectMap;
import it.unimi.dsi.fastutil.longs.Long2ObjectOpenHashMap;
import net.minecraft.resources.ResourceKey;
import net.minecraft.world.level.ChunkPos;
import net.minecraft.world.level.biome.Biome;
import net.minecraft.util.RandomSource;
import net.minecraft.world.level.levelgen.XoroshiroRandomSource;

public class OuterIslandLocator {
    private final SkyIslandConfig config;
    private final long worldSeed;
    private final Long2ObjectMap<IslandInstance> cellCache = new Long2ObjectOpenHashMap<>();

    public OuterIslandLocator(SkyIslandConfig config, long worldSeed) {
        this.config = config;
        this.worldSeed = worldSeed;
    }

    public IslandInstance getInfluencingIsland(int blockX, int blockZ) {
        int cellX = Math.floorDiv(blockX, config.outerIslandCellSize);
        int cellZ = Math.floorDiv(blockZ, config.outerIslandCellSize);
        
        for (int cx = cellX - 1; cx <= cellX + 1; cx++) {
            for (int cz = cellZ - 1; cz <= cellZ + 1; cz++) {
                IslandInstance island = getOrGenerateCell(cx, cz);
                if (island != null && island.influences(blockX, blockZ)) {
                    return island;
                }
            }
        }
        return null;
    }

    private IslandInstance getOrGenerateCell(int cellX, int cellZ) {
        long key = ChunkPos.asLong(cellX, cellZ);
        synchronized(cellCache) {
            return cellCache.computeIfAbsent(key, k -> generateCellData(cellX, cellZ));
        }
    }

    private IslandInstance generateCellData(int cellX, int cellZ) {
        long cellSeed = hash(cellX, cellZ);
        RandomSource rand = new XoroshiroRandomSource(cellSeed);
        
        if (rand.nextFloat() > config.outerIslandSpawnChance) {
            return null;
        }
        
        int padding = config.outerIslandSizeMax; 
        int localX = padding + rand.nextInt(config.outerIslandCellSize - 2 * padding);
        int localZ = padding + rand.nextInt(config.outerIslandCellSize - 2 * padding);
        
        int centerX = cellX * config.outerIslandCellSize + localX;
        int centerZ = cellZ * config.outerIslandCellSize + localZ;
        
        int radius = rand.nextInt(config.outerIslandSizeMin, config.outerIslandSizeMax);
        int centerY = rand.nextInt(config.outerIslandHeightMin, config.outerIslandHeightMax);
        
        IslandTerrainStyle style = determineStyle(rand);
        
        if (style == IslandTerrainStyle.LAYERED) {
            centerY = 256 + rand.nextInt(64); 
        }
        
        int biomeIndex = rand.nextInt(config.allowedOuterBiomes.size());
        ResourceKey<Biome> biome = config.allowedOuterBiomes.get(biomeIndex);
        
        return new IslandInstance(centerX, centerY, centerZ, radius, style, biome, cellSeed);
    }
    
    private IslandTerrainStyle determineStyle(RandomSource rand) {
        float f = rand.nextFloat();
        if (f < 0.30f) return IslandTerrainStyle.FLATLAND;
        if (f < 0.70f) return IslandTerrainStyle.HILLY;
        if (f < 0.90f) return IslandTerrainStyle.MOUNTAINOUS;
        return IslandTerrainStyle.LAYERED;
    }

    private long hash(int x, int z) {
        long h = worldSeed;
        h ^= (h >>> 33);
        h *= 0xff51afd7ed558ccdL;
        h ^= (h >>> 33);
        h ^= x * 0xc4ceb9fe1a85ec53L;
        h ^= z * 0x736ac4d62f25b512L;
        h ^= (h >>> 33);
        return h;
    }
}
