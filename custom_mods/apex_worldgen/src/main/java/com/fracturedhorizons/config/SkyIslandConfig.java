package com.fracturedhorizons.config;

import net.minecraft.core.registries.Registries;
import net.minecraft.resources.ResourceKey;
import net.minecraft.resources.ResourceLocation;
import net.minecraft.world.level.biome.Biome;

import java.util.List;

public class SkyIslandConfig {
    
    // Zonen Radien
    public final double coreRadius = 250.0; // Base Radius vor Bulge-Verzerrung
    public final double fadeEnd = 400.0;
    public final double bufferEnd = 600.0;
    public final double outerStart = 600.0;

    // Außeninsel Parameter
    public final int outerIslandCellSize = 1000;
    public final float outerIslandSpawnChance = 0.20f; // Sehr selten
    public final int outerIslandSizeMin = 50;
    public final int outerIslandSizeMax = 300;
    public final int outerIslandHeightMin = -32;
    public final int outerIslandHeightMax = 200;

    // Biome Whitelist (Vanilla Ocean Biome sind nicht in dieser Liste!)
    public final List<ResourceKey<Biome>> allowedOuterBiomes = List.of(
            ResourceKey.create(Registries.BIOME, ResourceLocation.withDefaultNamespace("plains")),
            ResourceKey.create(Registries.BIOME, ResourceLocation.withDefaultNamespace("windswept_hills")),
            ResourceKey.create(Registries.BIOME, ResourceLocation.withDefaultNamespace("snowy_plains")),
            ResourceKey.create(Registries.BIOME, ResourceLocation.withDefaultNamespace("mushroom_fields")),
            ResourceKey.create(Registries.BIOME, ResourceLocation.withDefaultNamespace("forest"))
    );
}
