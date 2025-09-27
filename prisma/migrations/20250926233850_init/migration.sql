-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Webinar" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "datetime" TIMESTAMP(3) NOT NULL,
    "language" TEXT NOT NULL,

    CONSTRAINT "Webinar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Speaker" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Speaker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SpeakerWebinar" (
    "idWebinar" INTEGER NOT NULL,
    "idSpeaker" INTEGER NOT NULL,

    CONSTRAINT "SpeakerWebinar_pkey" PRIMARY KEY ("idWebinar","idSpeaker")
);

-- CreateTable
CREATE TABLE "public"."Category" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CategoryWebinar" (
    "idWebinar" INTEGER NOT NULL,
    "idCategory" INTEGER NOT NULL,

    CONSTRAINT "CategoryWebinar_pkey" PRIMARY KEY ("idWebinar","idCategory")
);

-- CreateTable
CREATE TABLE "public"."UserWebinar" (
    "id" SERIAL NOT NULL,
    "idWebinar" INTEGER NOT NULL,
    "idUser" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "linkedin" TEXT NOT NULL,

    CONSTRAINT "UserWebinar_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserWebinar_idWebinar_idUser_key" ON "public"."UserWebinar"("idWebinar", "idUser");

-- CreateIndex
CREATE UNIQUE INDEX "UserWebinar_idWebinar_email_key" ON "public"."UserWebinar"("idWebinar", "email");

-- CreateIndex
CREATE UNIQUE INDEX "UserWebinar_idWebinar_linkedin_key" ON "public"."UserWebinar"("idWebinar", "linkedin");

-- AddForeignKey
ALTER TABLE "public"."SpeakerWebinar" ADD CONSTRAINT "SpeakerWebinar_idWebinar_fkey" FOREIGN KEY ("idWebinar") REFERENCES "public"."Webinar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SpeakerWebinar" ADD CONSTRAINT "SpeakerWebinar_idSpeaker_fkey" FOREIGN KEY ("idSpeaker") REFERENCES "public"."Speaker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CategoryWebinar" ADD CONSTRAINT "CategoryWebinar_idWebinar_fkey" FOREIGN KEY ("idWebinar") REFERENCES "public"."Webinar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CategoryWebinar" ADD CONSTRAINT "CategoryWebinar_idCategory_fkey" FOREIGN KEY ("idCategory") REFERENCES "public"."Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserWebinar" ADD CONSTRAINT "UserWebinar_idWebinar_fkey" FOREIGN KEY ("idWebinar") REFERENCES "public"."Webinar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserWebinar" ADD CONSTRAINT "UserWebinar_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
