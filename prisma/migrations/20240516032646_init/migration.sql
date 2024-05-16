-- CreateEnum
CREATE TYPE "TournamentType" AS ENUM ('Individual', 'Team');

-- CreateTable
CREATE TABLE "Score" (
    "id" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "playerName" TEXT NOT NULL,
    "tournamentId" TEXT NOT NULL,

    CONSTRAINT "Score_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Player" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tournament" (
    "id" TEXT NOT NULL,
    "type" "TournamentType" NOT NULL DEFAULT 'Team',
    "teamName" TEXT NOT NULL,
    "week" TIMESTAMP(3) NOT NULL,
    "scoreTotal" INTEGER NOT NULL,
    "place" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Tournament_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Score_playerName_tournamentId_key" ON "Score"("playerName", "tournamentId");

-- CreateIndex
CREATE UNIQUE INDEX "Player_name_key" ON "Player"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Tournament_teamName_week_type_key" ON "Tournament"("teamName", "week", "type");

-- CreateIndex
CREATE UNIQUE INDEX "Team_name_key" ON "Team"("name");

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_playerName_fkey" FOREIGN KEY ("playerName") REFERENCES "Player"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "Tournament"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tournament" ADD CONSTRAINT "Tournament_teamName_fkey" FOREIGN KEY ("teamName") REFERENCES "Team"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
