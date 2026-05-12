package com.fracturedhorizons.terrain;

public enum IslandTerrainStyle {
    FLATLAND(1.0, 0.2),      
    HILLY(0.8, 0.5),         
    MOUNTAINOUS(0.6, 0.9),   
    LAYERED(1.2, 0.1);       

    public final double baseSpread;
    public final double verticalRelief;

    IslandTerrainStyle(double baseSpread, double verticalRelief) {
        this.baseSpread = baseSpread;
        this.verticalRelief = verticalRelief;
    }
}
