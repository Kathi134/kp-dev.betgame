package de.kpdev.backendbetgame.model

import jakarta.persistence.*

@Entity
class Standing(
    @Id
    @GeneratedValue
    val id: Long = 0,
    @Column(name = "group_identifier")
    val group: Char,
    @OneToOne
    var team: Team,
    var position: Int,
    var playedGames: Int,
    var won: Int,
    var draw: Int,
    var lost: Int,
    var points: Int,
    var goalsFor: Int,
    var goalsAgainst: Int,
    var goalDifference: Int
) 