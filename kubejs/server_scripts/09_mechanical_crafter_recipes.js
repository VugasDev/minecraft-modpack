// 09_mechanical_crafter_recipes.js
// Mechanical Crafter Rezepte für T3/T4-Infrastruktur — asymmetrische Muster,
// damit diese Items ein etabliertes Create-Setup (Brass-Tier) voraussetzen.
//
// Designprinzip: Unförmige Muster (kein symmetrisches 3×3) → Spieler muss
// nachdenken, wie er den Crafter bestückt. Erzwingt Create-Adoption.

ServerEvents.recipes(event => {

    // ==========================================================================
    // MEKANISM PURIFICATION CHAMBER (T3 Ore-Tripling Gate)
    // ==========================================================================
    // Standard-Rezept: 4× Osmium + 4× Steel Casing + 1× Osmium Compressor.
    // Neue Anforderung: Mechanical Crafter + Brass Ingot + Gas Tank.
    // L-Muster: Verhindert Standard-Crafting-Table-Umgehung.
    //
    //   O O B
    //   O C B
    //   O G B
    //   (O=Osmium, C=Compressor, B=BrassIngot, G=GasTank)
    event.remove({ output: 'mekanism:purification_chamber' })
    event.recipes.create.mechanical_crafting(
        'mekanism:purification_chamber',
        [
            'OOB',
            'OCB',
            'OGB'
        ],
        {
            O: 'mekanism:ingot_osmium',
            C: 'mekanism:osmium_compressor',
            B: 'create:brass_ingot',
            G: 'mekanism:basic_gas_tank'
        }
    )

    // ==========================================================================
    // AE2 ME DRIVE (T3 AE2 Massenspeicher-Gate)
    // ==========================================================================
    // Standard-Rezept: 2× Iron Block + 6× Iron Ingot + 1× Basic Card.
    // Neue Anforderung: Mechanical Crafter + Precision Mechanism + Brass Casing.
    // Umgekehrtes T-Muster: Zwei Brass-Casings oben außen, ein Precision-Mech innen.
    //
    //   B D B
    //     D
    //     I
    //   (B=BrassCasing, D=MEDrive-Legacy, I=IronBlock, P=PrecisionMechanism)
    // → saubereres Muster:
    //
    //   B P B
    //   I D I
    //   I I I
    event.remove({ output: 'ae2:drive' })
    event.recipes.create.mechanical_crafting(
        'ae2:drive',
        [
            'BPB',
            'IDI',
            'III'
        ],
        {
            B: 'create:brass_casing',
            P: 'create:precision_mechanism',
            I: 'minecraft:iron_block',
            D: 'ae2:logic_processor'
        }
    )

    // ==========================================================================
    // PNEUMATICCRAFT ADVANCED PRESSURE TUBE (T4 PNC Gate)
    // ==========================================================================
    // Standard-Rezept: 4× Basic Pressure Tube + 4× Iron Ingot + 1× Compressed Iron.
    // Neue Anforderung: MC + Brass Ingot + Create Fluid Pipe + Compressed Iron.
    // Kreuz-Muster mit Brass außen:
    //
    //   B B B
    //   B C B
    //   B B B
    // + Fluid-Elbow innen (nicht standard da die Mitte besetzt ist)
    // → Asymmetrisch: Fluid Pipes oben/unten, Brass links/rechts, Compressed Iron Mitte
    //
    //     P
    //   B C B
    //   P   P
    //     I
    //   (P=FluidPipe, C=CompressedIron, B=BrassIngot, I=BasicPressureTube)
    event.remove({ output: 'pneumaticcraft:advanced_pressure_tube' })
    event.recipes.create.mechanical_crafting(
        'pneumaticcraft:advanced_pressure_tube',
        [
            ' P ',
            'BCB',
            'P P',
            ' I '
        ],
        {
            P: 'create:fluid_pipe',
            B: 'create:brass_ingot',
            C: 'pneumaticcraft:compressed_iron_block',
            I: 'pneumaticcraft:pressure_tube'
        }
    )

    // ==========================================================================
    // MEKANISM DIGITAL MINER (T4 Auto-Mining Gate)
    // ==========================================================================
    // Einer der stärksten automatischen Mining-Tools — sollte spät kommen.
    // Standard-Rezept: Osmium/Control Circuit/Steel Casing-Mix.
    // Neue Anforderung: MC + Precision Mechanism + Refined Obsidian + Atomic Alloy.
    // Diagonales Muster (Raute):
    //
    //   . P .
    //   O M O
    //   . A .
    //   (P=PrecisionMechanism, O=RefinedObsidianIngot, M=OriginalMiner, A=AtomicAlloy)
    event.remove({ output: 'mekanism:digital_miner' })
    event.recipes.create.mechanical_crafting(
        'mekanism:digital_miner',
        [
            ' P ',
            'OMO',
            ' A '
        ],
        {
            P: 'create:precision_mechanism',
            O: 'mekanism:ingot_refined_obsidian',
            M: 'mekanism:steel_casing',
            A: 'mekanism:alloy_infused'
        }
    )

})
