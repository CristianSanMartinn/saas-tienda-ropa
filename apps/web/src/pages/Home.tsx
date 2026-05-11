// src/pages/Home.tsx

import { Hero }          from '../components/sections/Hero/Hero'
import { Categories }    from '../components/sections/Categories/Categories'
import { ProductGrid }   from '../components/sections/ProductGrid/ProductGrid'
import { ProductDetail } from '../components/sections/ProductDetail/ProductDetail'
import { Reviews }       from '../components/sections/Reviews/Reviews'
import { Banner }        from '../components/sections/Banner/Banner'
import { Newsletter }    from '../components/sections/Newsletter/Newsletter'

export function Home() {
  return (
    <>
      <Hero />        
      <Categories />
      <ProductGrid />
      <ProductDetail />
      <Reviews />
      <Banner />
      <Newsletter />
    </>
  )
}