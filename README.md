# ERP Sederhana (Express.js + SQLite)

ERP sederhana berbasis **Node.js** untuk mengelola:
- Produk
- Stok
- Sales Order
- Invoice

Project ini dibuat dengan pendekatan **Object-Oriented Programming (OOP)**, struktur modular, dan sudah dilengkapi **REST API**, **unit test**, serta **integration test**.

---

## ✨ Fitur

### Product
- Tambah produk
- Update produk
- Kelola stok

### Sales Order
- Buat sales order
- Tambah item ke order
- Validasi stok
- Konfirmasi order (stok otomatis berkurang)
- Harga produk disimpan sebagai snapshot saat transaksi

### Invoice
- Generate invoice dari sales order
- Perhitungan otomatis:
  - Subtotal
  - Pajak 10%
  - Total

### Testing
- Unit test (business logic)
- Integration test (REST API)

---

## 🧱 Tech Stack

- Node.js
- Express
- Sequelize ORM
- SQLite
- Jest (testing)
- Supertest (API testing)

---

## 📁 Struktur Folder

```text
erp/
├── src/
│   ├── entities/        # Model / Entity (OOP)
│   ├── services/        # Business logic
│   ├── db.js            # Konfigurasi SQLite
│   └── index.js         # REST API server
├── tests/
│   ├── erp.test.js      # Unit test
│   └── api.test.js      # Integration test
├── package.json
└── README.md
```

🚀 Instalasi
- ```npm install```

▶️ Menjalankan Aplikasi
- ```npm start```

Server akan berjalan di:
- ```http://localhost:3000```

Database SQLite (erp.sqlite) akan otomatis dibuat saat aplikasi dijalankan.

🧪 Menjalankan Test
Menjalankan unit test dan integration test:
- ```npm test```

Test mencakup:
- Pembuatan produk
- Pembuatan sales order
- Validasi stok tidak cukup
- Konfirmasi order dan pengurangan stok
- Perhitungan invoice
- REST API workflow end-to-end

🌐 REST API Endpoints
Product
| Method | URL           | Body                                               | Deskripsi          |
| ------ | ------------- | -------------------------------------------------- | ------------------ |
| POST   | /products     | `{ "name": "Laptop", "price": 1000, "stock": 10 }` | Tambah produk baru |
| GET    | /products     | -                                                  | List semua produk  |
| PUT    | /products/:id | `{ "price": 1200 }`                                | Update produk      |

Sales Order
| Method | URL                      | Body                           | Deskripsi                                  |
| ------ | ------------------------ | ------------------------------ | ------------------------------------------ |
| POST   | /orders                  | -                              | Buat order baru                            |
| POST   | /orders/:orderId/items   | `{ "productId": 1, "qty": 2 }` | Tambah item ke order                       |
| POST   | /orders/:orderId/confirm | -                              | Konfirmasi order (stok dikurangi otomatis) |

Invoice
| Method | URL                      | Body | Deskripsi                                           |
| ------ | ------------------------ | ---- | --------------------------------------------------- |
| GET    | /orders/:orderId/invoice | -    | Generate invoice dari order yang sudah dikonfirmasi |

🔄 Contoh Workflow
1. Tambah Produk
POST /products
{
  "name": "Laptop",
  "price": 1000,
  "stock": 10
}

2. Buat Sales Order
POST /orders

3. Tambah Item ke Order
POST /orders/1/items
{
  "productId": 1,
  "qty": 2
}

4. Konfirmasi Order
POST /orders/1/confirm

5. Generate Invoice
GET /orders/1/invoice
