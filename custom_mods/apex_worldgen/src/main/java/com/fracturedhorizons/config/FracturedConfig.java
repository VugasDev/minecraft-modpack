package com.fracturedhorizons.config;

import net.neoforged.neoforge.common.ModConfigSpec;

public class FracturedConfig {
    public static final ModConfigSpec SPEC;

    public static final ModConfigSpec.DoubleValue MAINLAND_RADIUS;
    public static final ModConfigSpec.DoubleValue OUTER_RIM_START;
    public static final ModConfigSpec.BooleanValue DEBUG_SHOW_ZONE_BANDS;
    public static final ModConfigSpec.DoubleValue TRANSITION_COLLAPSE_STRENGTH;

    static {
        ModConfigSpec.Builder builder = new ModConfigSpec.Builder();

        builder.push("zones");
        MAINLAND_RADIUS = builder
                .comment("The radius of the mainland area. Use small values like 512 for debugging.")
                .defineInRange("mainlandRadius", 10000.0, 0.0, 1000000.0);
        
        OUTER_RIM_START = builder
                .comment("The radius where the outer rim starts. Use small values like 2048 for debugging.")
                .defineInRange("outerRimStart", 32000.0, 0.0, 1000000.0);
        
        TRANSITION_COLLAPSE_STRENGTH = builder
                .comment("Strength of the terrain collapse in the transition zone.")
                .defineInRange("transitionCollapseStrength", 0.65, 0.0, 1.0);
        builder.pop();

        builder.push("debug");
        DEBUG_SHOW_ZONE_BANDS = builder
                .comment("Enable debug logging or visual markers for zone bands.")
                .define("showZoneBands", false);
        builder.pop();

        SPEC = builder.build();
    }
}
