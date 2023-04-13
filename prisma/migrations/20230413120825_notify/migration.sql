-- CreateTable
CREATE TABLE "Notify" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Notify_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Notify_id_key" ON "Notify"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Notify_email_key" ON "Notify"("email");
