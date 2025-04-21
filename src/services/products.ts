export async function getProducts({ name = "", page = 1, per_page = 10, price_max, price_min } = {}) {
    const params = new URLSearchParams();
  
    if (name) params.append("name", name);
    if (page) params.append("page", page.toString());
    if (per_page) params.append("per_page", per_page.toString());
    if (price_max) params.append("price_max", price_max.toString())
    if (price_min) params.append("price_min", price_min.toString())
  
    try {
      const response = await fetch(`http://localhost:5000/products?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error("Error al obtener los productos");
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error en la solicitud:", error);
      return null;
    }
  }