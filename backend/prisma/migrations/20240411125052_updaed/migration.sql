-- CreateTable
CREATE TABLE "Submission" (
    "id" SERIAL NOT NULL,
    "responce" JSONB NOT NULL,
    "formId" TEXT NOT NULL,

    CONSTRAINT "Submission_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
