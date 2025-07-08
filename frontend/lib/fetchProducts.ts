export async function fetchProducts(main?: string, sub?: string) {
    const res = await fetch(`http://localhost:7000/product?mainCategory=${main}&subCategory=${sub}`, {
        cache: 'no-store'
    })
    const data = await res.json()
    return data
}
