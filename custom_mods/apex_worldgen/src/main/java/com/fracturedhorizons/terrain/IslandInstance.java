package com.fracturedhorizons.terrain;

import net.minecraft.resources.ResourceKey;
import net.minecraft.world.level.biome.Biome;

public record IslandInstance(
        int centerX, 
        int centerY, 
        int centerZ, 
        int radius, 
        IslandTerrainStyle style, 
        ResourceKey<Biome> dominantBiome, 
        long islandSeed) {
            
    public boolean influences(int blockX, int blockZ) {
        double distSq = (blockX - centerX) * (blockX - centerX) + (blockZ - centerZ) * (blockZ - centerZ);
        double influenceRadius = radius * 1.5;
        return distSq <= influenceRadius * influenceRadius;
    }
}
