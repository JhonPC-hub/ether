import React, { useState, useEffect } from 'react';
import './App.css';

// Funciones de utilidad para localStorage
const getStoredUsers = () => {
  const stored = localStorage.getItem('ether_users');
  if (!stored) {
    // Crear usuario admin por defecto
    const defaultUsers = {
      'admin@ether.com': {
        email: 'admin@ether.com',
        password: 'admin123',
        name: 'Administrador',
        role: 'admin',
        purchases: []
      }
    };
    localStorage.setItem('ether_users', JSON.stringify(defaultUsers));
    return defaultUsers;
  }
  const users = JSON.parse(stored);
  // Migrar usuario admin si existe con clave antigua
  if (users.admin && !users['admin@ether.com']) {
    users['admin@ether.com'] = users.admin;
    delete users.admin;
    localStorage.setItem('ether_users', JSON.stringify(users));
  }
  // Asegurar que existe el usuario admin
  if (!users['admin@ether.com']) {
    users['admin@ether.com'] = {
      email: 'admin@ether.com',
      password: 'admin123',
      name: 'Administrador',
      role: 'admin',
      purchases: []
    };
    localStorage.setItem('ether_users', JSON.stringify(users));
  }
  return users;
};

const saveUsers = (users) => {
  localStorage.setItem('ether_users', JSON.stringify(users));
};

const getStoredPerfumes = () => {
  const stored = localStorage.getItem('ether_perfumes');
  if (!stored) {
    const defaultPerfumes = [
      {
        id: 1,
        name: 'Sauvage',
        brand: 'Dior',
        description: 'Un perfume fresco y picante con notas de bergamota calabresa, pimienta de Sichuan y ámbar gris. Una fragancia audaz y moderna.',
        image: 'https://images.unsplash.com/photo-1515378791036-0648a814c963?w=400&h=400&fit=crop&q=80',
        link: 'https://www.dior.com/es_es/fragrances/caballeros/sauvage',
        sales: 0
      },
      {
        id: 2,
        name: 'Bleu de Chanel',
        brand: 'Chanel',
        description: 'Una fragancia amaderada y aromática con notas de cítricos, jengibre, menta y sándalo. Elegancia atemporal.',
        image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&h=400&fit=crop&q=80',
        link: 'https://www.chanel.com/es/fragrance/bleu-de-chanel',
        sales: 0
      },
      {
        id: 3,
        name: 'Acqua di Gio',
        brand: 'Giorgio Armani',
        description: 'Un perfume acuático con notas de bergamota, neroli, jazmín y ámbar gris. Frescura mediterránea en cada gota.',
        image: 'https://images.unsplash.com/photo-1588405748880-12d5e0c069b6?w=400&h=400&fit=crop&q=80',
        link: 'https://www.armanibeauty.com/acqua-di-gio',
        sales: 0
      },
      {
        id: 4,
        name: 'La Nuit de L\'Homme',
        brand: 'Yves Saint Laurent',
        description: 'Una fragancia sensual y misteriosa con notas de lavanda, cardamomo, cedro y vetiver. La noche cobra vida.',
        image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop&q=80',
        link: 'https://www.yslbeauty.com/la-nuit-de-lhomme',
        sales: 0
      },
      {
        id: 5,
        name: 'Terre d\'Hermès',
        brand: 'Hermès',
        description: 'Un perfume terrestre con notas de naranja, geranio, sándalo y benjuí. Una conexión con la naturaleza.',
        image: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=400&h=400&fit=crop&q=80',
        link: 'https://www.hermes.com/terre-dhermes',
        sales: 0
      },
      {
        id: 6,
        name: 'One Million',
        brand: 'Paco Rabanne',
        description: 'Una fragancia lujosa con notas de uva, rosa, menta, canela y cuero. Opulencia y sofisticación.',
        image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=400&h=400&fit=crop&q=80',
        link: 'https://www.pacorabanne.com/one-million',
        sales: 0
      },
      {
        id: 7,
        name: 'Invictus',
        brand: 'Paco Rabanne',
        description: 'Un perfume deportivo con notas de pomelo, hojas de laurel, ámbar gris y madera de gaiac. Victoria y fuerza.',
        image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop&q=80',
        link: 'https://www.pacorabanne.com/invictus',
        sales: 0
      },
      {
        id: 8,
        name: 'The One',
        brand: 'Dolce & Gabbana',
        description: 'Una fragancia cálida con notas de bergamota, cilantro, jengibre, cardamomo y ámbar. Seducción italiana.',
        image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=400&h=400&fit=crop&q=80',
        link: 'https://www.dolcegabbana.com/the-one',
        sales: 0
      },
      {
        id: 9,
        name: 'Eros',
        brand: 'Versace',
        description: 'Un perfume intenso con notas de menta, manzana verde, vainilla, madera y musgo. Pasión y deseo.',
        image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop&q=80',
        link: 'https://www.versace.com/eros',
        sales: 0
      },
      {
        id: 10,
        name: 'L\'Homme',
        brand: 'Prada',
        description: 'Una fragancia refinada con notas de bergamota, cardamomo, violeta, ámbar y sándalo. Elegancia moderna.',
        image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop&q=80',
        link: 'https://www.prada.com/lhomme',
        sales: 0
      },
      {
        id: 11,
        name: 'Spicebomb',
        brand: 'Victor & Rolf',
        description: 'Un perfume especiado con notas de bergamota, pimienta, canela, azafrán y tabaco. Intensidad explosiva.',
        image: 'https://images.unsplash.com/photo-1587923600806-b2b0a4e8d8be?w=400&h=400&fit=crop&q=80',
        link: 'https://www.viktor-rolf.com/spicebomb',
        sales: 0
      },
      {
        id: 12,
        name: 'Cool Water',
        brand: 'Davidoff',
        description: 'Una fragancia acuática con notas de lavanda, menta, almizcle y ámbar. Frescura oceánica.',
        image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&h=400&fit=crop&q=80',
        link: 'https://www.davidoff.com/cool-water',
        sales: 0
      },
      {
        id: 13,
        name: 'Tom Ford Noir',
        brand: 'Tom Ford',
        description: 'Un perfume sofisticado con notas de bergamota, verbena, rosa negra, pachulí y sándalo. Lujo absoluto.',
        image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=400&h=400&fit=crop&q=80',
        link: 'https://www.tomford.com/noir',
        sales: 0
      },
      {
        id: 14,
        name: 'Aventus',
        brand: 'Creed',
        description: 'Una fragancia exclusiva con notas de piña, manzana, abedul, pachulí y musgo. Majestuosidad en cada gota.',
        image: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=400&h=400&fit=crop&q=80',
        link: 'https://www.creedboutique.com/aventus',
        sales: 0
      },
      {
        id: 15,
        name: 'Le Male',
        brand: 'Jean Paul Gaultier',
        description: 'Un perfume icónico con notas de lavanda, menta, cardamomo, canela, vainilla y ámbar. Seducción masculina.',
        image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop&q=80',
        link: 'https://www.jeanpaulgaultier.com/le-male',
        sales: 0
      },
      {
        id: 16,
        name: 'Black Opium',
        brand: 'Yves Saint Laurent',
        description: 'Una fragancia femenina adictiva con notas de café, jazmín, vainilla y pachulí. Intensidad nocturna.',
        image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop&q=80',
        link: 'https://www.yslbeauty.com/black-opium',
        sales: 0
      },
      {
        id: 17,
        name: 'Flowerbomb',
        brand: 'Viktor & Rolf',
        description: 'Una explosión floral con notas de rosa, jazmín, orquídea, pachulí y ámbar. Feminidad poderosa.',
        image: 'https://images.unsplash.com/photo-1615634089770-24ad6f9e5daf?w=400&h=400&fit=crop&q=80',
        link: 'https://www.viktor-rolf.com/flowerbomb',
        sales: 0
      },
      {
        id: 18,
        name: 'Coco Mademoiselle',
        brand: 'Chanel',
        description: 'Una fragancia moderna con notas de naranja, rosa, jazmín, pachulí y vainilla. Elegancia atrevida.',
        image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=400&h=400&fit=crop&q=80',
        link: 'https://www.chanel.com/coco-mademoiselle',
        sales: 0
      },
      {
        id: 19,
        name: 'J\'adore',
        brand: 'Dior',
        description: 'Un bouquet floral con notas de magnolia, rosa, jazmín, orquídea y sándalo. Feminidad radiante.',
        image: 'https://images.unsplash.com/photo-1595425970377-b19336f9cb98?w=400&h=400&fit=crop&q=80',
        link: 'https://www.dior.com/jadore',
        sales: 0
      },
      {
        id: 20,
        name: 'Alien',
        brand: 'Thierry Mugler',
        description: 'Una fragancia misteriosa con notas de jazmín sambac, cashmerán y ámbar. Intensidad sobrenatural.',
        image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&h=400&fit=crop&q=80',
        link: 'https://www.mugler.com/alien',
        sales: 0
      },
      {
        id: 21,
        name: 'Good Girl',
        brand: 'Carolina Herrera',
        description: 'Una dualidad fascinante con notas de almendra, café, jazmín, rosa y cacao. Contraste elegante.',
        image: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=400&h=400&fit=crop&q=80',
        link: 'https://www.carolinaherrera.com/good-girl',
        sales: 0
      },
      {
        id: 22,
        name: 'Light Blue',
        brand: 'Dolce & Gabbana',
        description: 'Una fragancia mediterránea con notas de limón siciliano, manzana, bambú y ámbar. Frescura solar.',
        image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop&q=80',
        link: 'https://www.dolcegabbana.com/light-blue',
        sales: 0
      }
    ];
    localStorage.setItem('ether_perfumes', JSON.stringify(defaultPerfumes));
    return defaultPerfumes;
  }
  return JSON.parse(stored);
};

const savePerfumes = (perfumes) => {
  localStorage.setItem('ether_perfumes', JSON.stringify(perfumes));
};

const getNextPerfumeId = (perfumes) => {
  return perfumes.length > 0 ? Math.max(...perfumes.map(p => p.id)) + 1 : 1;
};

const getWhatsAppNumber = () => {
  const stored = localStorage.getItem('ether_whatsapp_number');
  const defaultNumber = '5491123456789';
  // Si el valor guardado está vacío o solo contiene espacios, devolver el número por defecto
  if (!stored || stored.trim() === '') {
    return defaultNumber;
  }
  return stored.trim();
};

const saveWhatsAppNumber = (number) => {
  localStorage.setItem('ether_whatsapp_number', number);
};

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [perfumes, setPerfumes] = useState(getStoredPerfumes());
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPerfumes, setFilteredPerfumes] = useState(perfumes);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [newPerfume, setNewPerfume] = useState({ name: '', brand: '', description: '', image: '', link: '' });
  const [loginError, setLoginError] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState(getWhatsAppNumber());

  useEffect(() => {
    const storedUser = localStorage.getItem('ether_current_user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setFilteredPerfumes(perfumes);
    setWhatsappNumber(getWhatsAppNumber());
  }, [perfumes]);

  useEffect(() => {
    setFilteredPerfumes(
      perfumes.filter(perfume =>
        perfume.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        perfume.brand.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, perfumes]);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    const users = getStoredUsers();
    const user = users[loginData.email];
    
    if (user && user.password === loginData.password) {
      setCurrentUser(user);
      localStorage.setItem('ether_current_user', JSON.stringify(user));
      setShowLogin(false);
      setLoginData({ email: '', password: '' });
      if (user.role === 'admin') {
        setShowAdmin(true);
      }
    } else {
      setLoginError('Email o contraseña incorrectos');
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setRegisterError('');
    const users = getStoredUsers();
    
    if (users[registerData.email]) {
      setRegisterError('Este email ya está registrado');
      return;
    }
    
    if (registerData.password !== registerData.confirmPassword) {
      setRegisterError('Las contraseñas no coinciden');
      return;
    }
    
    if (registerData.password.length < 6) {
      setRegisterError('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    
    const newUser = {
      email: registerData.email,
      password: registerData.password,
      name: registerData.name,
      role: 'user',
      purchases: []
    };
    
    users[registerData.email] = newUser;
    saveUsers(users);
    setCurrentUser(newUser);
    localStorage.setItem('ether_current_user', JSON.stringify(newUser));
    setShowRegister(false);
    setRegisterData({ name: '', email: '', password: '', confirmPassword: '' });
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('ether_current_user');
    setShowProfile(false);
    setShowAdmin(false);
  };

  const addToCart = (perfume) => {
    setCart([...cart, perfume]);
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const handlePurchase = () => {
    if (cart.length === 0) return;
    
    if (!currentUser) {
      setShowLogin(true);
      return;
    }
    
    // Registrar compra
    const users = getStoredUsers();
    const user = users[currentUser.email];
    const purchaseDate = new Date().toISOString();
    const purchase = {
      id: Date.now(),
      date: purchaseDate,
      items: [...cart],
      total: cart.length
    };
    user.purchases.push(purchase);
    users[currentUser.email] = user;
    saveUsers(users);
    setCurrentUser(user);
    localStorage.setItem('ether_current_user', JSON.stringify(user));
    
    // Actualizar ventas de perfumes
    const updatedPerfumes = perfumes.map(p => {
      const soldCount = cart.filter(item => item.id === p.id).length;
      return soldCount > 0 ? { ...p, sales: (p.sales || 0) + soldCount } : p;
    });
    setPerfumes(updatedPerfumes);
    savePerfumes(updatedPerfumes);
    
    // Enviar a WhatsApp
    const message = 'Estoy interesado en éstos perfumes.\n\n' + 
      cart.map(item => `${item.name} - ${item.brand}\n${item.link}`).join('\n\n');
    
    const currentWhatsappNumber = getWhatsAppNumber();
    const whatsappUrl = `https://wa.me/${currentWhatsappNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    
    setCart([]);
    setIsCartOpen(false);
  };

  const handleAddPerfume = (e) => {
    e.preventDefault();
    const newId = getNextPerfumeId(perfumes);
    const perfume = {
      ...newPerfume,
      id: newId,
      sales: 0
    };
    const updatedPerfumes = [...perfumes, perfume];
    setPerfumes(updatedPerfumes);
    savePerfumes(updatedPerfumes);
    setNewPerfume({ name: '', brand: '', description: '', image: '', link: '' });
  };

  const handleDeletePerfume = (id) => {
    const updatedPerfumes = perfumes.filter(p => p.id !== id);
    setPerfumes(updatedPerfumes);
    savePerfumes(updatedPerfumes);
  };

  const getTopSelling = () => {
    return [...perfumes]
      .sort((a, b) => (b.sales || 0) - (a.sales || 0))
      .slice(0, 6);
  };

  const getUsers = () => {
    return getStoredUsers();
  };

  return (
    <div className="App">
      <header className="header">
        <div className="header-content">
          <h1 className="logo animate-fade-in">ETHER</h1>
          <div className="header-actions">
            <input
              type="text"
              placeholder="Buscar perfume..."
              className="search-input animate-slide-in"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {currentUser ? (
              <>
                {currentUser.role === 'admin' && (
                  <button 
                    className="admin-button animate-scale-in"
                    onClick={() => {
                      setShowAdmin(!showAdmin);
                      setShowProfile(false);
                    }}
                  >
                    Admin
                  </button>
                )}
                <button 
                  className="profile-button animate-scale-in"
                  onClick={() => {
                    setShowProfile(!showProfile);
                    setShowAdmin(false);
                  }}
                >
                  {currentUser.name}
                </button>
                <button 
                  className="logout-button animate-scale-in"
                  onClick={handleLogout}
                >
                  Salir
                </button>
              </>
            ) : (
              <>
                <button 
                  className="login-button animate-scale-in"
                  onClick={() => {
                    setShowLogin(true);
                    setShowRegister(false);
                  }}
                >
                  Iniciar Sesión
                </button>
                <button 
                  className="register-button animate-scale-in"
                  onClick={() => {
                    setShowRegister(true);
                    setShowLogin(false);
                  }}
                >
                  Registrarse
                </button>
              </>
            )}
            <button 
              className="cart-button animate-scale-in"
              onClick={() => setIsCartOpen(!isCartOpen)}
            >
              <span className="cart-icon">C</span>
              <span className="cart-count">{cart.length}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="main-content">
        {!showAdmin && !showProfile && (
          <>
            <section className="top-selling-section">
              <h2 className="section-title animate-fade-in">Más Vendidos</h2>
              <div className="perfume-grid">
                {getTopSelling().map((perfume, index) => (
                  <div 
                    key={perfume.id} 
                    className="perfume-card animate-card-enter"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="perfume-image-container">
                      <img 
                        src={perfume.image} 
                        alt={perfume.name}
                        className="perfume-image"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop&q=80';
                        }}
                      />
                      <div className="perfume-overlay">
                        <button 
                          className="add-to-cart-btn"
                          onClick={() => addToCart(perfume)}
                        >
                          Añadir al carrito
                        </button>
                      </div>
                      <div className="bestseller-badge">Bestseller</div>
                    </div>
                    <div className="perfume-info">
                      <h2 className="perfume-brand animate-text-slide">{perfume.brand}</h2>
                      <h3 className="perfume-name animate-text-slide-delay">{perfume.name}</h3>
                      <p className="perfume-description animate-fade-in-delay">{perfume.description}</p>
                      <p className="sales-count">Ventas: {perfume.sales || 0}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="all-perfumes-section">
              <h2 className="section-title animate-fade-in">Todos los Perfumes</h2>
              <div className="perfume-grid">
                {filteredPerfumes.map((perfume, index) => (
                  <div 
                    key={perfume.id} 
                    className="perfume-card animate-card-enter"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="perfume-image-container">
                      <img 
                        src={perfume.image} 
                        alt={perfume.name}
                        className="perfume-image"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop&q=80';
                        }}
                      />
                      <div className="perfume-overlay">
                        <button 
                          className="add-to-cart-btn"
                          onClick={() => addToCart(perfume)}
                        >
                          Añadir al carrito
                        </button>
                      </div>
                    </div>
                    <div className="perfume-info">
                      <h2 className="perfume-brand animate-text-slide">{perfume.brand}</h2>
                      <h3 className="perfume-name animate-text-slide-delay">{perfume.name}</h3>
                      <p className="perfume-description animate-fade-in-delay">{perfume.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {showProfile && currentUser && (
          <div className="profile-section animate-fade-in">
            <h2>Mi Perfil</h2>
            <div className="profile-info">
              <p><strong>Nombre:</strong> {currentUser.name}</p>
              <p><strong>Email:</strong> {currentUser.email}</p>
              <p><strong>Rol:</strong> {currentUser.role === 'admin' ? 'Administrador' : 'Usuario'}</p>
            </div>
            <h3>Historial de Compras</h3>
            {currentUser.purchases && currentUser.purchases.length > 0 ? (
              <div className="purchases-list">
                {currentUser.purchases.map((purchase) => (
                  <div key={purchase.id} className="purchase-item">
                    <p><strong>Fecha:</strong> {new Date(purchase.date).toLocaleDateString()}</p>
                    <p><strong>Productos:</strong> {purchase.items.length}</p>
                    <ul>
                      {purchase.items.map((item, idx) => (
                        <li key={idx}>{item.name} - {item.brand}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <p>No has realizado compras aún</p>
            )}
          </div>
        )}

        {showAdmin && currentUser && currentUser.role === 'admin' && (
          <div className="admin-section animate-fade-in">
            <h2>Panel de Administración</h2>
            
            <div className="admin-tabs">
              <button 
                className="admin-tab active"
                onClick={() => {
                  document.querySelector('.admin-perfumes').style.display = 'block';
                  document.querySelector('.admin-users').style.display = 'none';
                  document.querySelector('.admin-stats').style.display = 'none';
                  document.querySelector('.admin-settings').style.display = 'none';
                }}
              >
                Perfumes
              </button>
              <button 
                className="admin-tab"
                onClick={() => {
                  document.querySelector('.admin-perfumes').style.display = 'none';
                  document.querySelector('.admin-users').style.display = 'block';
                  document.querySelector('.admin-stats').style.display = 'none';
                  document.querySelector('.admin-settings').style.display = 'none';
                }}
              >
                Usuarios
              </button>
              <button 
                className="admin-tab"
                onClick={() => {
                  document.querySelector('.admin-perfumes').style.display = 'none';
                  document.querySelector('.admin-users').style.display = 'none';
                  document.querySelector('.admin-stats').style.display = 'none';
                  document.querySelector('.admin-settings').style.display = 'block';
                }}
              >
                Configuración
              </button>
              <button 
                className="admin-tab"
                onClick={() => {
                  document.querySelector('.admin-perfumes').style.display = 'none';
                  document.querySelector('.admin-users').style.display = 'none';
                  document.querySelector('.admin-settings').style.display = 'none';
                  document.querySelector('.admin-stats').style.display = 'block';
                }}
              >
                Estadísticas
              </button>
            </div>

            <div className="admin-perfumes">
              <h3>Añadir Nuevo Perfume</h3>
              <form onSubmit={handleAddPerfume} className="perfume-form">
                <input
                  type="text"
                  placeholder="Nombre"
                  value={newPerfume.name}
                  onChange={(e) => setNewPerfume({ ...newPerfume, name: e.target.value })}
                  required
                />
                <input
                  type="text"
                  placeholder="Marca"
                  value={newPerfume.brand}
                  onChange={(e) => setNewPerfume({ ...newPerfume, brand: e.target.value })}
                  required
                />
                <textarea
                  placeholder="Descripción"
                  value={newPerfume.description}
                  onChange={(e) => setNewPerfume({ ...newPerfume, description: e.target.value })}
                  required
                />
                <input
                  type="url"
                  placeholder="URL de la imagen"
                  value={newPerfume.image}
                  onChange={(e) => setNewPerfume({ ...newPerfume, image: e.target.value })}
                  required
                />
                <input
                  type="url"
                  placeholder="Link del producto"
                  value={newPerfume.link}
                  onChange={(e) => setNewPerfume({ ...newPerfume, link: e.target.value })}
                  required
                />
                <button type="submit">Añadir Perfume</button>
              </form>

              <h3>Gestionar Perfumes</h3>
              <div className="admin-perfumes-list">
                {perfumes.map((perfume) => (
                  <div key={perfume.id} className="admin-perfume-item">
                    <img src={perfume.image} alt={perfume.name} />
                    <div>
                      <h4>{perfume.name} - {perfume.brand}</h4>
                      <p>Ventas: {perfume.sales || 0}</p>
                    </div>
                    <button onClick={() => handleDeletePerfume(perfume.id)}>Eliminar</button>
                  </div>
                ))}
              </div>
            </div>

            <div className="admin-users" style={{ display: 'none' }}>
              <h3>Usuarios Registrados</h3>
              <div className="admin-users-list">
                {Object.values(getUsers()).map((user, idx) => (
                  <div key={idx} className="admin-user-item">
                    <p><strong>Nombre:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Rol:</strong> {user.role === 'admin' ? 'Administrador' : 'Usuario'}</p>
                    <p><strong>Compras:</strong> {user.purchases ? user.purchases.length : 0}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="admin-stats" style={{ display: 'none' }}>
              <h3>Estadísticas</h3>
              <div className="stats-grid">
                <div className="stat-card">
                  <h4>Total de Perfumes</h4>
                  <p>{perfumes.length}</p>
                </div>
                <div className="stat-card">
                  <h4>Total de Usuarios</h4>
                  <p>{Object.keys(getUsers()).length}</p>
                </div>
                <div className="stat-card">
                  <h4>Total de Ventas</h4>
                  <p>{perfumes.reduce((sum, p) => sum + (p.sales || 0), 0)}</p>
                </div>
                <div className="stat-card">
                  <h4>Perfume Más Vendido</h4>
                  <p>
                    {perfumes.length > 0 
                      ? perfumes.reduce((max, p) => (p.sales || 0) > (max.sales || 0) ? p : max).name
                      : 'N/A'
                    }
                  </p>
                </div>
              </div>
              <h4>Top 5 Más Vendidos</h4>
              <ol>
                {[...perfumes]
                  .sort((a, b) => (b.sales || 0) - (a.sales || 0))
                  .slice(0, 5)
                  .map((p, idx) => (
                    <li key={idx}>{p.name} - {p.brand} ({p.sales || 0} ventas)</li>
                  ))}
              </ol>
            </div>

            <div className="admin-settings" style={{ display: 'none' }}>
              <h3>Configuración de WhatsApp</h3>
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!whatsappNumber || whatsappNumber.trim() === '') {
                    alert('Por favor ingresa un número de WhatsApp válido');
                    setWhatsappNumber(getWhatsAppNumber());
                    return;
                  }
                  saveWhatsAppNumber(whatsappNumber.trim());
                  setWhatsappNumber(whatsappNumber.trim());
                  alert('Número de WhatsApp actualizado correctamente');
                }} 
                className="perfume-form"
              >
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                    Número de WhatsApp (formato: 5491123456789)
                  </label>
                  <input
                    type="text"
                    placeholder="5491123456789"
                    value={whatsappNumber}
                    onChange={(e) => {
                      // Remover caracteres no numéricos excepto el signo +
                      const value = e.target.value.replace(/[^\d+]/g, '');
                      setWhatsappNumber(value);
                    }}
                    required
                    pattern="[+]?[0-9]+"
                    style={{ marginBottom: '1rem' }}
                  />
                  <p style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '1rem' }}>
                    El formato debe ser sin espacios ni guiones. Ejemplo: 5491123456789<br/>
                    {whatsappNumber && whatsappNumber.trim() !== '' ? (
                      <>El enlace será: <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>https://wa.me/{whatsappNumber}</a></>
                    ) : (
                      <>Ingresa un número para ver el enlace</>
                    )}
                  </p>
                </div>
                <button type="submit">Guardar Número de WhatsApp</button>
              </form>
            </div>
          </div>
        )}
      </main>

      {showLogin && (
        <div className="modal-overlay animate-fade-in" onClick={() => setShowLogin(false)}>
          <div className="modal animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setShowLogin(false)}>×</button>
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Email"
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                required
              />
              <input
                type="password"
                placeholder="Contraseña"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                required
              />
              {loginError && <p className="error-message">{loginError}</p>}
              <button type="submit">Iniciar Sesión</button>
              <p>
                ¿No tienes cuenta?{' '}
                <span 
                  className="link-text"
                  onClick={() => {
                    setShowLogin(false);
                    setShowRegister(true);
                  }}
                >
                  Regístrate
                </span>
              </p>
            </form>
          </div>
        </div>
      )}

      {showRegister && (
        <div className="modal-overlay animate-fade-in" onClick={() => setShowRegister(false)}>
          <div className="modal animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setShowRegister(false)}>×</button>
            <h2>Registrarse</h2>
            <form onSubmit={handleRegister}>
              <input
                type="text"
                placeholder="Nombre"
                value={registerData.name}
                onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={registerData.email}
                onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                required
              />
              <input
                type="password"
                placeholder="Contraseña"
                value={registerData.password}
                onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                required
              />
              <input
                type="password"
                placeholder="Confirmar Contraseña"
                value={registerData.confirmPassword}
                onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                required
              />
              {registerError && <p className="error-message">{registerError}</p>}
              <button type="submit">Registrarse</button>
              <p>
                ¿Ya tienes cuenta?{' '}
                <span 
                  className="link-text"
                  onClick={() => {
                    setShowRegister(false);
                    setShowLogin(true);
                  }}
                >
                  Inicia sesión
                </span>
              </p>
            </form>
          </div>
        </div>
      )}

      {isCartOpen && (
        <div className="cart-sidebar animate-slide-in-right">
          <div className="cart-header">
            <h2>Carrito</h2>
            <button 
              className="close-cart"
              onClick={() => setIsCartOpen(false)}
            >
              ×
            </button>
          </div>
          <div className="cart-items">
            {cart.length === 0 ? (
              <p className="empty-cart">El carrito está vacío</p>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="cart-item animate-cart-item">
                  <img src={item.image} alt={item.name} className="cart-item-image" />
                  <div className="cart-item-info">
                    <h4>{item.name}</h4>
                    <p>{item.brand}</p>
                  </div>
                  <button 
                    className="remove-item"
                    onClick={() => removeFromCart(item.id)}
                  >
                    ×
                  </button>
                </div>
              ))
            )}
          </div>
              {cart.length > 0 && (
                <div className="cart-footer">
                  <button
                    className="purchase-btn"
                    onClick={handlePurchase}
                  >
                    Comprar
                  </button>
                </div>
              )}
        </div>
      )}

      {isCartOpen && (
        <div 
          className="cart-overlay animate-fade-in"
          onClick={() => setIsCartOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
