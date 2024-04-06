-- CreateTable
CREATE TABLE "Form" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "properties" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "publish" BOOLEAN NOT NULL DEFAULT false,
    "updaedAt" TIMESTAMP(3),
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Form_pkey" PRIMARY KEY ("id")
);
