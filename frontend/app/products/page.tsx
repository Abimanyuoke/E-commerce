import ProductCard from '@/components/ProductCard'
import { fetchProducts } from '@/libs/fetchProducts'

interface Props {
    searchParams: {
        main?: string
        sub?: string
    }
}

export default async function ProductsPage({ searchParams }: Props) {
    const { main, sub } = searchParams
    const products = await fetchProducts(main, sub)

    return (
        <div className='container mx-auto px-6 py-10'>
            <h1 className='text-2xl font-bold mb-6'>
                Produk {main} {sub && `- ${sub.replaceAll("_", " ")}`}
            </h1>

            {products.length === 0 ? (
                <p>Tidak ada produk ditemukan.</p>
            ) : (
                <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
                    {products.map((product: any) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    )
}
