package de.kpdev.backendbetgame.model

enum class SpecialBetType {

    GROUP_A_WINNER,
    GROUP_B_WINNER,
    GROUP_C_WINNER,
    GROUP_D_WINNER,
    GROUP_E_WINNER,
    GROUP_F_WINNER,
    GROUP_G_WINNER,
    GROUP_H_WINNER,
    GROUP_I_WINNER,
    GROUP_J_WINNER,
    GROUP_K_WINNER,
    GROUP_L_WINNER,

    PLACE_1,
    PLACE_2,
    PLACE_3,
    PLACE_4,

    TOP_SCORER_TEAM,

    GERMANY_FINAL_STAGE;

    companion object {
        fun valueByGroupIdentifier(groupIdentifier: Char): SpecialBetType? {
            return when(groupIdentifier)  {
                'A' -> GROUP_A_WINNER
                'B' -> GROUP_B_WINNER
                'C' -> GROUP_C_WINNER
                'D' -> GROUP_D_WINNER
                'E' -> GROUP_E_WINNER
                'F' -> GROUP_F_WINNER
                'G' -> GROUP_G_WINNER
                'H' -> GROUP_H_WINNER
                'I' -> GROUP_I_WINNER
                'J' -> GROUP_J_WINNER
                'K' -> GROUP_K_WINNER
                'L' -> GROUP_L_WINNER
                else -> null
            }
        }
    }
}