package de.kpdev.backendbetgame.model

enum class CompetitionStage {
    GROUP_STAGE,
    LAST_64,
    LAST_32,
    LAST_16,
    THIRD_PLACE,
    QUARTER_FINALS,
    SEMI_FINALS,
    FINAL,
    CLAUSURA,
    PRELIMINARY_ROUND,
    QUALIFICATION,
    QUALIFICATION_ROUND_1,
    QUALIFICATION_ROUND_2,
    QUALIFICATION_ROUND_3,
    PLAYOFFS,
    ROUND_1,
    ROUND_2,
    ROUND_3,
    ROUND_4,
    PLAYOFF_ROUND_1,
    PLAYOFF_ROUND_2,
    REGULAR_SEASON,
    APERTURA,
    CHAMPIONSHIP,
    RELEGATION,
    RELEGATION_ROUND;

    operator fun inc(): CompetitionStage {
        if(this== GROUP_STAGE)
            return LAST_64
        if(this == LAST_64)
            return LAST_32
        if(this == LAST_32)
            return LAST_16
        if(this == LAST_16)
            return QUARTER_FINALS
        if(this == QUARTER_FINALS)
            return SEMI_FINALS
        if(this == SEMI_FINALS)
            return FINAL
        if(this == FINAL)
            return CLAUSURA
        return GROUP_STAGE
    }

}