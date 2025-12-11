export interface Rating {
  rate: number;
  count: number;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

export interface Category {
  name: string;
}


export interface BuyRequest {
  products: number[];    
  student: boolean;       
  coupon?: string;        
  name: string;           
}


export interface BuyResponse {
  totalCost: string;   // valor final após descontos
  reference: string;   // referência de pagamento
  example: string;     // mensagem personalizada
  error: string;       // string vazia se não houver erro
}


export interface ErrorResponse {
  error: string;
}
