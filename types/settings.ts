export interface Settings {
  id: string
  siteName: string
  siteDescription: string
  logo: string
  favicon: string
  primaryColor: string
  secondaryColor: string
  accentColor: string
  paymentMethods: {
    stripe: boolean
    paypal: boolean
    orangeMoney: boolean
    mtnMomo: boolean
  }
  stripePublicKey: string
  stripeSecretKey: string
  paypalClientId: string
  paypalSecret: string
  metaTitle: string
  metaDescription: string
  metaKeywords: string
  metaImage: string
  createdAt: Date
  updatedAt: Date
} 