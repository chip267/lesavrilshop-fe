# Lesavril - Fashion E-commerce Platform

An elegant e-commerce platform specializing in contemporary fashion, featuring personalized style recommendations to help shoppers discover their perfect wardrobe. With an extensive collection spanning multiple categories for all genders, we cater to diverse fashion preferences and lifestyles.

## 🌟 Features

### Shopping Experience
- **Intuitive User Interface**: Clean and modern design for effortless navigation
- **Smart Search**: Find products quickly with advanced filtering options
- **Style Recommendations**: Personalized suggestions based on browsing history and preferences
- **Detailed Product Information**: High-quality images, size guides, and fabric details
- **Virtual Try-On**: AI-powered feature to visualize how clothes might look (coming soon)

### Product Management
- **Diverse Categories**: Men's, Women's, Kids', Accessories, and more
- **Size Availability**: Real-time stock tracking across all sizes
- **Regular New Arrivals**: Stay updated with the latest fashion trends
- **Seasonal Collections**: Curated collections for every season

### User Features
- **User Profile Management**: Save preferences and shipping details
- **Shopping Cart**: Easy add/remove items functionality
- **Wishlist**: Save favorite items for later
- **Order History**: Track past purchases and reorder easily
- **Secure Checkout**: Multiple payment options with encrypted transactions

## 🛠️ Technical Stack

### Backend
- .NET 8.0+
- PostgreSQL
- RESTful API architecture
- Authentication & Authorization

### Frontend
- NextJS
- ShadcnUI
- Redux for state management
- Responsive design principles

### Development Tools
- Visual Studio 2022 or VS Code
- npm/yarn package manager
- Git for version control

## 🚀 Getting Started

### Prerequisites
- Node.js (Latest LTS version)
- .NET SDK 8.0 or higher
- SQL Server 2019+
- Visual Studio 2022/VS Code

### Installation Steps

1. Clone the repository
```bash
git clone https://github.com/yourusername/stylehub.git
cd stylehub
```

2. Install frontend dependencies
```bash
cd ClientApp
npm install
```

3. Install backend dependencies
```bash
cd ../Server
dotnet restore
```

4. Set up the database
```bash
dotnet ef database update
```

5. Start the development server
```bash
# Terminal 1 - Frontend
cd ClientApp
npm run dev

# Terminal 2 - Backend
cd Server
dotnet run
```

The application will be available at `http://localhost:3000` (frontend) and `http://localhost:5000` (backend API).

## 📝 Configuration

Create a `.env` file in the root directory with the following variables:
```env
DATABASE_CONNECTION=your_connection_string
JWT_SECRET=your_secret_key
STRIPE_KEY=your_stripe_key
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

