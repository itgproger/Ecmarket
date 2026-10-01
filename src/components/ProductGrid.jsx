import ProductCard from './ProductCard'

export default function ProductGrid({ products }) {
  return <div className="grid grid-cols-1 gap-x-5 gap-y-12 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div>
}
