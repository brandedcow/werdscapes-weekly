-- CreateTable
CREATE TABLE "TournamentScore" (
    "id" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "playerId" TEXT NOT NULL,
    "playerName" TEXT NOT NULL,
    "individualTournamentId" TEXT NOT NULL,
    "teamTournamentId" TEXT NOT NULL,

    CONSTRAINT "TournamentScore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Brilliance" (
    "id" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Brilliance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Player" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "teamName" TEXT NOT NULL,
    "isCurrentTeam" BOOLEAN NOT NULL DEFAULT true,
    "isLeader" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IndividualTournament" (
    "id" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "week" TIMESTAMP(3) NOT NULL,
    "scoreTotal" INTEGER NOT NULL,
    "place" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "IndividualTournament_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamTournament" (
    "id" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "week" TIMESTAMP(3) NOT NULL,
    "scoreTotal" INTEGER NOT NULL,
    "place" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "TeamTournament_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TournamentScore_playerId_individualTournamentId_key" ON "TournamentScore"("playerId", "individualTournamentId");

-- CreateIndex
CREATE UNIQUE INDEX "TournamentScore_playerId_teamTournamentId_key" ON "TournamentScore"("playerId", "teamTournamentId");

-- CreateIndex
CREATE UNIQUE INDEX "Player_id_name_key" ON "Player"("id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "IndividualTournament_playerId_week_key" ON "IndividualTournament"("playerId", "week");

-- CreateIndex
CREATE UNIQUE INDEX "TeamTournament_teamId_week_key" ON "TeamTournament"("teamId", "week");

-- CreateIndex
CREATE UNIQUE INDEX "Team_id_name_key" ON "Team"("id", "name");

-- AddForeignKey
ALTER TABLE "TournamentScore" ADD CONSTRAINT "TournamentScore_playerId_playerName_fkey" FOREIGN KEY ("playerId", "playerName") REFERENCES "Player"("id", "name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TournamentScore" ADD CONSTRAINT "TournamentScore_individualTournamentId_fkey" FOREIGN KEY ("individualTournamentId") REFERENCES "IndividualTournament"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TournamentScore" ADD CONSTRAINT "TournamentScore_teamTournamentId_fkey" FOREIGN KEY ("teamTournamentId") REFERENCES "TeamTournament"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Brilliance" ADD CONSTRAINT "Brilliance_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_teamId_teamName_fkey" FOREIGN KEY ("teamId", "teamName") REFERENCES "Team"("id", "name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndividualTournament" ADD CONSTRAINT "IndividualTournament_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamTournament" ADD CONSTRAINT "TeamTournament_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
