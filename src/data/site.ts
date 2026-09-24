// Single source of truth for all business details shown on the website.
// Update values here and they propagate everywhere.

import type { ImageKey } from './images'

export const company = {
  name: "RoyalJet Int'l Shipping and Logistics Ltd",
  shortName: 'RoyalJet',
  tagline: 'Your Trusted Logistics Partner from China to Nigeria',
  phoneDisplay: '+234 903 810 9552',
  phoneHref: 'tel:+2349038109552',
  whatsappNumber: '2349038109552',
  instagramHandle: '@royaljet_intl_shipping',
  instagramUrl: 'https://www.instagram.com/royaljet_intl_shipping',
}

export const nigeriaOffice = {
  label: 'Nigeria Office',
  lines: ['No. 4 Alhaji Lukman Street,', 'Off Chivita Avenue, Ajao Estate,', 'Lagos, Nigeria.'],
  mapsQuery: 'No. 4 Alhaji Lukman Street, Chivita Avenue, Ajao Estate, Lagos, Nigeria',
}

export const chinaWarehouse = {
  label: 'Guangzhou Warehouse (Air Freight)',
  /** Exact text suppliers need — shown verbatim and copied to clipboard. */
  chinese: [
    '斯凯威国际尼日利亚专线空运地址:',
    '广州市越秀区岗头大街40号美潮汇一楼A1003档(正门入口处左手边)菲德昊国际物流',
    '联系人:ROYALJET/13711413985',
    '入仓号: FWB2404037',
  ],
  english: [
    { k: 'Address', v: 'Stall A1003, 1st Floor, Meichaohui, No. 40 Gangtou Street, Yuexiu District, Guangzhou (left-hand side of the main entrance)' },
    { k: 'Receiver', v: 'ROYALJET' },
    { k: 'China phone', v: '+86 137 1141 3985' },
    { k: 'Warehouse code', v: 'FWB2404037' },
  ],
  warehouseCode: 'FWB2404037',
  chinaPhone: '13711413985',
}

export const whatsappLink = (message?: string) =>
  `https://wa.me/${company.whatsappNumber}${message ? `?text=${encodeURIComponent(message)}` : ''}`

export const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/services', label: 'Services' },
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/track', label: 'Track Shipment' },
  { to: '/contact', label: 'Contact' },
]

export type ServiceIcon = 'plane' | 'ship' | 'search' | 'boxes' | 'wallet' | 'warehouse' | 'truck' | 'shield'

export const services: {
  slug: string
  icon: ServiceIcon
  title: string
  short: string
  long: string
  points: string[]
  image: ImageKey
}[] = [
  {
    slug: 'air-freight',
    icon: 'plane',
    title: 'Air Freight',
    short: 'Fast, dependable air cargo from Guangzhou to Lagos for urgent and high-value goods.',
    long: 'When time matters, our air freight line moves your goods from our Guangzhou warehouse to Lagos quickly and safely. Ideal for electronics, fashion, accessories, samples and any shipment that needs to arrive fast.',
    points: ['Regular departures from Guangzhou', 'Charged by weight — no hidden fees', 'Ideal for small and medium parcels'],
    image: 'airCargo',
  },
  {
    slug: 'sea-freight',
    icon: 'ship',
    title: 'Sea Freight',
    short: 'Cost-effective ocean shipping for bulky, heavy and large-volume cargo.',
    long: 'Moving large or heavy goods? Sea freight is the most economical way to ship from China to Nigeria. We handle loading, documentation and clearing so your cargo arrives complete.',
    points: ['Shared container (LCL) & full container options', 'Best rates for heavy and bulky goods', 'Machinery, furniture, building materials & more'],
    image: 'containerShip',
  },
  {
    slug: 'sourcing',
    icon: 'search',
    title: 'Sourcing & Procurement',
    short: 'We help you find reliable suppliers in China and buy the right products at the right price.',
    long: 'Not sure where to buy? Our team helps you find trusted suppliers, compare prices, confirm quality and place orders on your behalf — so you only deal with sellers you can trust.',
    points: ['Supplier search & verification', 'Price negotiation', 'Quality checks before shipping'],
    image: 'sourcing',
  },
  {
    slug: 'consolidation',
    icon: 'boxes',
    title: 'Goods Consolidation',
    short: 'Buy from many suppliers — we combine everything into one shipment to save you money.',
    long: 'Order from as many Chinese sellers as you like. We receive every package at our warehouse, check it, and consolidate it into a single shipment, cutting your shipping costs significantly.',
    points: ['Receive from multiple suppliers', 'Repacking and labelling', 'One shipment, one lower cost'],
    image: 'boxes',
  },
  {
    slug: 'supplier-payments',
    icon: 'wallet',
    title: 'Supplier Payments',
    short: 'Pay your Chinese suppliers easily and securely through us.',
    long: 'Paying Chinese suppliers can be difficult from Nigeria. We make it simple — pay us in Naira and we settle your supplier, so your orders move without delays.',
    points: ['Pay in Naira', 'Fast settlement to suppliers', 'Clear payment records'],
    image: 'payment',
  },
  {
    slug: 'warehousing',
    icon: 'warehouse',
    title: 'Warehousing',
    short: 'Secure storage at our Guangzhou warehouse while your goods await shipment.',
    long: 'Your goods are safely received, recorded and stored at our Guangzhou warehouse until they are ready to ship. We notify you as items arrive so you always know what we have.',
    points: ['Secure, monitored storage', 'Arrival notifications', 'Inventory updates on request'],
    image: 'warehouse',
  },
  {
    slug: 'delivery',
    icon: 'truck',
    title: 'Pickup & Door Delivery',
    short: 'Collect from our Lagos office or have your goods delivered straight to your door.',
    long: 'Once your shipment lands in Nigeria, pick it up at our Ajao Estate office or let us deliver it to your home, shop or warehouse anywhere in Lagos and across Nigeria.',
    points: ['Pickup at Ajao Estate, Lagos', 'Doorstep delivery in Lagos', 'Nationwide dispatch available'],
    image: 'truck',
  },
  {
    slug: 'clearing',
    icon: 'shield',
    title: 'Customs Clearing',
    short: 'We handle customs clearing and documentation so you don’t have to.',
    long: 'Customs can be confusing and slow. Our experienced team manages the documentation and clearing process, keeping your shipment moving and your costs predictable.',
    points: ['Documentation handled for you', 'Transparent clearing costs', 'Fewer delays at port'],
    image: 'port',
  },
]

export const steps = [
  {
    title: 'Buy from your supplier',
    body: 'Shop on 1688, Taobao, Alibaba, Pinduoduo or directly from any Chinese supplier — or let us source for you.',
  },
  {
    title: 'Send to our Guangzhou warehouse',
    body: 'Give your supplier our warehouse address and code FWB2404037 with your name and phone number on every package.',
  },
  {
    title: 'We receive, check & ship',
    body: 'We confirm arrival, consolidate your goods and send them by air or sea. You get updates along the way.',
  },
  {
    title: 'Pick up or get it delivered',
    body: 'Collect your goods at our Lagos office in Ajao Estate or have them delivered to your door.',
  },
]

export const values = [
  { title: 'Reliable', body: 'We handle every shipment with care and keep you informed from warehouse to delivery.' },
  { title: 'Affordable', body: 'Clear, honest pricing with no hidden charges — so you can plan and profit.' },
  { title: 'Simple', body: 'One partner for buying, paying, shipping and delivery. We do the hard work.' },
  { title: 'Transparent', body: 'Real people answering on WhatsApp. Ask us anything, any time.' },
]

export const faqs = [
  {
    q: 'How do I ship my goods from China to Nigeria with RoyalJet?',
    a: 'Buy from your Chinese supplier, then give them our Guangzhou warehouse address with the warehouse code FWB2404037, your name and phone number. Once your goods arrive, we ship them to Lagos and notify you for pickup or delivery.',
  },
  {
    q: 'How long does shipping take?',
    a: 'Air freight is the fastest option and usually arrives within a couple of weeks after departure. Sea freight takes longer but is much cheaper for heavy goods. Message us on WhatsApp for the current transit times.',
  },
  {
    q: 'How much does it cost?',
    a: 'Air freight is charged per kilogram and sea freight by volume (CBM). Rates change with the market, so send us a message on WhatsApp for today’s rate — we reply quickly.',
  },
  {
    q: 'Can you buy goods and pay suppliers for me?',
    a: 'Yes. We can help you source products, confirm suppliers and pay them on your behalf. You pay us in Naira and we take care of the rest.',
  },
  {
    q: 'What should my supplier write on the package?',
    a: 'Ask your supplier to write the warehouse code FWB2404037 plus your name and phone number clearly on every package. This helps us identify your goods quickly.',
  },
  {
    q: 'Are there items you cannot ship?',
    a: 'Yes. Prohibited and dangerous goods such as weapons, drugs, flammable liquids and counterfeit items cannot be shipped. Items like batteries, liquids and powders may need special handling — contact us before buying.',
  },
  {
    q: 'Where do I pick up my goods in Nigeria?',
    a: 'At our office: No. 4 Alhaji Lukman Street, off Chivita Avenue, Ajao Estate, Lagos. We can also deliver to your door.',
  },
]
