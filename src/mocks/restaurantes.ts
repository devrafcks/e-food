import { type Restaurante } from '../types'

export const mockRestaurantes: Restaurante[] = [
  {
    id: 1,
    titulo: "La Dolce Vita Trattoria",
    destacado: true,
    tipo: "Italiana",
    avaliacao: 4.8,
    descricao: "A clássica culinária italiana com um toque moderno. Massas artesanais e vinhos selecionados que transportam você diretamente para a Toscana.",
    capa: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=1000",
    cardapio: [
      {
        id: 101,
        nome: "Pizza Margherita",
        descricao: "Massa de fermentação natural, molho de tomate pelado, mussarela de búfala e manjericão fresco.",
        foto: "https://imgs.search.brave.com/uFqCYFf0YuFoVdvgbRT7Q5l2xasIO8g1lQm6qRJBqfo/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9waXp6/YS1tYXJnaGVyaXRh/LTE1OTAyMTc3Lmpw/Zw",
        preco: 59.90,
        porcao: "1 pessoa"
      }
    ]
  },
  {
    id: 2,
    titulo: "Velory Sushi",
    destacado: true,
    tipo: "Japonesa",
    avaliacao: 4.9,
    descricao: "O melhor da culinária japonesa tradicional e contemporânea em um ambiente sofisticado com peixes sempre frescos do dia.",
    capa: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=1000",
    cardapio: [
      {
        id: 201,
        nome: "Combinado Premium",
        descricao: "20 peças variadas com salmão, atum e peixe branco da estação, incluindo sashimis e niguiris trufados.",
        foto: "https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=500",
        preco: 120.00,
        porcao: "2 pessoas"
      }
    ]
  },
  {
    id: 3,
    titulo: "The Burger Kingdom",
    destacado: false,
    tipo: "Hambúrguer",
    avaliacao: 4.7,
    descricao: "Hambúrgueres artesanais grelhados no fogo como churrasco. Ingredientes selecionados e molhos secretos da casa.",
    capa: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1000",
    cardapio: [
      {
        id: 301,
        nome: "King Bacon",
        descricao: "Blend de 180g, muito bacon crocante, queijo cheddar derretido e maionese defumada no pão brioche.",
        foto: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=500",
        preco: 45.00,
        porcao: "1 pessoa"
      }
    ]
  },
  {
    id: 4,
    titulo: "Oásis do Oriente",
    destacado: false,
    tipo: "Árabe",
    avaliacao: 4.6,
    descricao: "Receitas milenares passadas de geração em geração. O melhor kibe, esfiha e homus da região.",
    capa: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?q=80&w=1000",
    cardapio: [
      {
        id: 401,
        nome: "Prato Degustação",
        descricao: "Kibe frito, 2 esfihas de carne, homus, coalhada seca e pão árabe quentinho.",
        foto: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=500",
        preco: 68.00,
        porcao: "2 pessoas"
      }
    ]
  },
  {
    id: 5,
    titulo: "Bistrô Paris 1920",
    destacado: true,
    tipo: "Francesa",
    avaliacao: 4.9,
    descricao: "Um pedaço de Paris no coração da cidade. Pratos clássicos executados com maestria técnica francesa.",
    capa: "https://imgs.search.brave.com/dgGUQVmD-Z2qckR3c1fsqiZSRUSTo7HW2w7pUuyRE8Q/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/cGFyaXNnb3VybWFu/ZC5jb20vdGVtcGxh/dGVzL3lvb3RoZW1l/L2NhY2hlL2IzL291/dmVydHVyZS1yZXN0/YXVyYW50LW91dmUt/ODAwLWIzZWJmNjQ4/LmpwZWc",
    cardapio: [
      {
        id: 501,
        nome: "Petit Gâteau Noir",
        descricao: "Bolo de chocolate amargo com recheio cremoso, servido com sorvete de baunilha Bourbon.",
        foto: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=500",
        preco: 32.00,
        porcao: "1 pessoa"
      }
    ]
  },
  {
    id: 6,
    titulo: "Sabor do Sertão",
    destacado: false,
    tipo: "Brasileira",
    avaliacao: 4.7,
    descricao: "O melhor da comida afetiva brasileira. Baião de dois, carne de sol e temperos típicos do nosso Nordeste.",
    capa: "https://imgs.search.brave.com/Qg7Yua9Ep91Anq7jwDdMAPlIXQo7WkXmHEkMNSMMH1U/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wb3J0/YWx2YWxlbnRpbmEu/Y29tLmJyL3NpdGUv/d3AtY29udGVudC91/cGxvYWRzLzIwMjIv/MTEvU2Fib3ItZG8t/U2VydGFvLTEtMzQw/eDIxNS5qcGVn",
    cardapio: [
      {
        id: 601,
        nome: "Baião de Dois Completo",
        descricao: "Arroz, feijão fradinho, queijo coalho, bacon, linguiça e carne de sol desfiada.",
        foto: "https://imgs.search.brave.com/KavaySv8LHraPLs14f4QnLx9gWuMbvIbDPLORx1PmVE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zMDEu/dmlkZW8uZ2xiaW1n/LmNvbS94NzIwLzEw/NjExMzc2LmpwZw",
        preco: 54.00,
        porcao: "2 pessoas"
      }
    ]
  }
]