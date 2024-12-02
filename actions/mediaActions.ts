"use server";

import prisma from "@/lib/prisma";

export async function getMedia() {
  const data = await prisma.media.findMany();

  return data;
}

export async function createMedia(
  url: string,
  type: "IMAGE" | "VIDEO" | "AUDIO",
  name: string
) {
  await prisma.media.create({
    data: {
      url,
      type: type,
      placeholder: false,
      active: false,
      name,
    },
  });
}

export async function deleteMedia(id: string) {
  await prisma.media.delete({
    where: { id },
  });
}

export async function updateMedia(
  id: string,
  url: string,
  type: "IMAGE" | "VIDEO" | "AUDIO",
  active: boolean,
  placeholder: boolean,
  name: string
) {
  await prisma.media.update({
    where: { id },
    data: { url, type, placeholder, active, name },
  });
}

export async function updateMediaPlaceholder(
  id: string,
  isPlaceholder: boolean
) {
  await prisma.media.findFirst({
    where: {
      placeholder: true,
    },
  });
  await prisma.media.update({
    where: { id },
    data: { placeholder: isPlaceholder },
  });
}

export async function updateMediaActive(id: string) {
  await prisma.$transaction(async (prisma) => {
    await prisma.media.updateMany({
      where: { active: true },
      data: { active: false },
    });

    await prisma.media.update({
      where: { id },
      data: { active: true },
    });
  });
}
export async function getActiveMedia() {
  const activeMedia = await prisma.media.findFirst({
    where: {
      active: true,
    },
  });
  return activeMedia;
}

export async function getPlaceholder() {
  const placeholderMedia = await prisma.media.findFirst({
    where: {
      placeholder: true,
    },
  });
  return placeholderMedia;
}

export async function getMediaById(id: string) {
  const media = await prisma.media.findUnique({
    where: {
      id: id,
    },
  });
  return media;
}
