import { Prisma } from '@prisma/client'

export type Settings = Prisma.SettingsGetPayload<{}>
export type SecuritySettings = Prisma.SecuritySettingsGetPayload<{}> 