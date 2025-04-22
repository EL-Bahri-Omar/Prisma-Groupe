import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import GoBack from './GoBack';
import ScrollTop from './ScrollTop';
import './styles/BlogDetails.css';

const BlogDetails = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Toggle sidebar function
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // Sample blog posts data
  const blogPosts = [
    {
      id: 1,
      title: "Sponsoring Événementiel : Comment Maximiser le ROI",
      subtitle: "Les stratégies éprouvées pour transformer vos investissements en résultats concrets",
      slug: "sponsoring-evenementiel-roi",
      date: "15 mars 2024",
      category: "Retail",
      readTime: "8 min",
      publisher: "Marie Dupont",
      publisherRole: "Directrice Stratégie Marketing",
      publisherImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      image: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      tags: ["sponsoring", "retail", "ROI"],
      featured: true,
      paragraphs: [
        {
          type: "text",
          content: "Le sponsoring événementiel représente un investissement significatif pour les marques. Comment s'assurer que chaque euro dépensé génère un réel retour sur investissement ? Notre travail avec Viatbike, leader du vélo électrique urbain, offre des enseignements précieux sur la transformation d'une visibilité événementielle en ventes concrètes."
        },
        {
          type: "subtitle",
          content: "Le défi : Au-delà de la simple visibilité"
        },
        {
          type: "text",
          content: "Pour Viatbike, le sponsoring du Tour de France Urbain représentait une opportunité unique de toucher leur cœur de cible. L'enjeu était double : créer une association forte avec la mobilité urbaine durable tout en convertissant l'enthousiasme généré en essais produit puis en ventes."
        },
        {
          type: "subtitle",
          content: "Notre approche : La méthode 360° intégrée"
        },
        {
          type: "text",
          content: "Plutôt que de limiter l'activation à un logo sur des supports événementiels, nous avons développé une stratégie en trois temps :"
        },
        {
          type: "list",
          items: [
            "Pré-événement : Campagne de qualification des prospects via les réseaux sociaux avec inscription à des essais exclusifs pendant l'événement",
            "Pendant l'événement : Création d'une expérience immersive avec zone d'essai, technologie de réalité augmentée montrant les économies réalisées en temps réel, et collecte de données qualifiées",
            "Post-événement : Nurturing personnalisé avec offre dédiée aux participants et analyse d'attribution précise"
          ]
        },
        {
          type: "subtitle",
          content: "Les résultats : Des chiffres qui parlent d'eux-mêmes"
        },
        {
          type: "text",
          content: "Cette approche intégrée a généré des résultats exceptionnels :"
        },
        {
          type: "list",
          items: [
            "+420% de ROI par rapport aux campagnes précédentes",
            "3200 essais qualifiés pendant l'événement",
            "Taux de conversion de 18% des essais en achats dans les 30 jours",
            "85% des acheteurs ont cité l'expérience événementielle comme facteur déterminant de leur décision"
          ]
        },
        {
          type: "subtitle",
          content: "Les enseignements clés pour votre stratégie"
        },
        {
          type: "text",
          content: "Cette expérience nous a permis d'identifier trois facteurs de succès essentiels pour maximiser le ROI de vos actions de sponsoring :"
        },
        {
          type: "list",
          items: [
            "L'intégration parfaite entre l'expérience digitale et physique",
            "La collecte de données qualifiées plutôt que quantitatives",
            "Le suivi post-événement personnalisé avec une temporalité optimisée"
          ]
        },
        {
          type: "conclusion",
          content: "Le sponsoring événementiel n'est plus une simple question de visibilité mais une opportunité d'engager une conversation personnalisée avec vos prospects les plus qualifiés. En adoptant une approche intégrée et mesurable, vous transformerez chaque euro investi en valeur concrète pour votre entreprise."
        }
      ],
      gallery: [
        "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1471967183320-ee018f6e114a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
      ],
      relatedArticles: [6, 10, 5]
    },
    {
        id: 2,
        title: "Marketing Direct 2.0 : Personnalisation grâce à l'IA",
        subtitle: "Comment nos algorithmes boostent les taux d'ouverture de 40%",
        slug: "marketing-direct-ia-personnalisation",
        date: "22 mars 2024",
        category: "Data",
        readTime: "10 min",
        publisher: "Jean Martin",
        publisherRole: "Responsable Data Science",
        publisherImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        tags: ["IA", "marketing direct", "personnalisation"],
        paragraphs: [
          {
            type: "text",
            content: "Le marketing direct traditionnel peine à maintenir son efficacité dans un monde saturé de messages publicitaires. Notre solution ? Une plateforme d'IA propriétaire qui redéfinit la personnalisation à grande échelle."
          },
          {
            type: "subtitle",
            content: "L'approche traditionnelle et ses limites"
          },
          {
            type: "text",
            content: "Les méthodes classiques de segmentation (âge, sexe, localisation) montrent leurs limites avec des taux d'ouverture stagnants autour de 15-20%. Notre analyse de 2 millions de campagnes révèle que :"
          },
          {
            type: "list",
            items: [
              "82% des contenus ne sont pas adaptés au moment de réception",
              "73% des offres ne correspondent pas à l'intention réelle du client",
              "Seulement 12% des variables sont réellement prédictives"
            ]
          },
          {
            type: "subtitle",
            content: "Notre solution : L'IA comportementale dynamique"
          },
          {
            type: "text",
            content: "Notre algorithme MARS (Marketing AI Real-time System) analyse en temps réel :"
          },
          {
            type: "list",
            items: [
              "Les micro-comportements sur les sites clients",
              "Les tendances émotionnelles via l'analyse sémantique",
              "Les schémas d'interaction multi-canal",
              "Les facteurs contextuels (météo, actualités, événements locaux)"
            ]
          },
          {
            type: "subtitle",
            content: "Cas client : Une marque de luxe"
          },
          {
            type: "text",
            content: "Pour une maison de joaillerie, nous avons implémenté :"
          },
          {
            type: "list",
            items: [
              "Optimisation dynamique des heures d'envoi (+31% d'ouvertures)",
              "Adaptation du vocabulaire selon l'humeur détectée (+27% de CTR)",
              "Suggestions de produits basées sur les interactions non-achevées (+43% de conversion)"
            ]
          },
          {
            type: "conclusion",
            content: "L'IA ne remplace pas la créativité humaine mais l'amplifie. En combinant data science et psychologie comportementale, nous redonnons au marketing direct sa pertinence et son impact."
          }
        ],
        gallery: [
          "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
        ],
        relatedArticles: [10, 8, 3]
      },
    
      // Article 3
      {
        id: 3,
        title: "Promotions Digitale vs Physique : Le Match",
        subtitle: "Analyse comparative sur 6 mois avec une marque de cosmétiques",
        slug: "promotions-digitale-physique-comparaison",
        date: "5 avril 2024",
        category: "Innovation",
        readTime: "12 min",
        publisher: "Sophie Lambert",
        publisherRole: "Directrice Innovation Retail",
        publisherImage: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        tags: ["promotion", "innovation", "phygital"],
        paragraphs: [
          {
            type: "text",
            content: "Le grand débat des marketeurs : les promotions digitales surpassent-elles les traditionnelles promotions en magasin ? Notre étude avec une marque leader de cosmétiques apporte des réponses surprenantes."
          },
          {
            type: "subtitle",
            content: "Méthodologie : Un test en conditions réelles"
          },
          {
            type: "text",
            content: "Pendant 6 mois, nous avons testé 4 scénarios sur 120 points de vente :"
          },
          {
            type: "list",
            items: [
              "Promotions purement digitales (email + réseaux sociaux)",
              "Promotions purement physiques (PLV en magasin)",
              "Promotions hybrides sans synchronisation",
              "Promotions phygital synchronisées (notre solution)"
            ]
          },
          {
            type: "subtitle",
            content: "Résultats clés : Le choc des générations"
          },
          {
            type: "text",
            content: "Contrairement aux attentes, les promotions purement digitales n'ont pas dominé :"
          },
          {
            type: "list",
            items: [
              "Les 18-25 ans : +22% d'efficacité avec le phygital synchronisé",
              "Les 26-40 ans : Pas de différence significative entre les canaux",
              "Les 41-60 ans : +35% de réponse aux promotions physiques",
              "Panier moyen : +28% avec notre solution phygital"
            ]
          },
          {
            type: "subtitle",
            content: "Notre technologie de synchronisation"
          },
          {
            type: "text",
            content: "Le secret de notre approche réside dans :"
          },
          {
            type: "list",
            items: [
              "La géolocalisation précise en magasin",
              "L'activation digitale au moment de l'approche physique du produit",
              "L'unification des données en temps réel",
              "L'adaptation dynamique du message selon le parcours client"
            ]
          },
          {
            type: "conclusion",
            content: "La guerre des canaux est terminée. L'avenir appartient aux expériences synchronisées qui respectent les préférences générationnelles tout en créant des parcours sans friction."
          }
        ],
        gallery: [
          "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
        ],
        relatedArticles: [7, 1, 6]
      },
    
      // Article 4
      {
        id: 4,
        title: "Relations Presse Créatives : 5 Campagnes Qui Ont Marqué 2023",
        subtitle: "Exemples concrets dont notre opération 'Art dans la Rue' pour une marque de luxe",
        slug: "relations-presse-creatives-campagnes",
        date: "10 avril 2024",
        category: "Luxe",
        readTime: "9 min",
        publisher: "Élodie Rousseau",
        publisherRole: "Directrice Communication Créative",
        publisherImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        tags: ["RP", "créativité", "luxe"],
        paragraphs: [
          {
            type: "text",
            content: "Dans un monde saturé de messages, les relations presse traditionnelles ne suffisent plus. Voici 5 campagnes qui ont redéfini les règles du jeu en 2023, avec des enseignements applicables à tous les secteurs."
          },
          {
            type: "subtitle",
            content: "1. 'Art dans la Rue' - Marque de joaillerie"
          },
          {
            type: "text",
            content: "Plutôt qu'un traditionnel défilé, nous avons transformé 5 quartiers parisiens en galeries d'art éphémères avec :"
          },
          {
            type: "list",
            items: [
              "Des œuvres street art intégrant discrètement les créations",
              "Une chasse au trésor digitale pour les journalistes",
              "Des performances inattendues dans des lieux du quotidien"
            ]
          },
          {
            type: "subtitle",
            content: "2. 'Le Test Aveugle' - Marque auto électrique"
          },
          {
            type: "text",
            content: "Des journalistes ont testé des véhicules sans connaître les marques, révélant des préjugés surprenants et générant un débat médiatique inédit."
          },
          {
            type: "subtitle",
            content: "3. 'Les Archives Vivantes' - Maison de couture"
          },
          {
            type: "text",
            content: "Nous avons recréé des looks iconiques des années 50 avec des influenceurs contemporains, illustrant l'intemporalité de la marque."
          },
          {
            type: "subtitle",
            content: "4. 'Le Dîner Silencieux' - Restaurant étoilé"
          },
          {
            type: "text",
            content: "Une expérience immersive où les journalistes ont dîné avec des casques reproduisant différentes ambiances sonores, redéfinissant la notion d'expérience culinaire."
          },
          {
            type: "subtitle",
            content: "5. 'L'Échappée Belle' - Marque de montres"
          },
          {
            type: "text",
            content: "Plutôt qu'une conférence de presse, un voyage en train luxueux à travers l'Europe avec des surprises à chaque arrêt, créant un storytelling médiatique naturel."
          },
          {
            type: "conclusion",
            content: "Ces campagnes partagent 3 points communs : elles créent des expériences mémorables, engagent émotionnellement et offrent des angles médiatiques multiples. En 2024, la créativité RP ne se mesure plus en colonnes de presse mais en conversations générées."
          }
        ],
        gallery: [
          "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
        ],
        relatedArticles: [9, 1, 6]
      },
    
      // Article 5
      {
        id: 5,
        title: "Événements Durables : Notre Charte Zéro Carbone",
        subtitle: "Comment nous avons réduit de 65% l'impact environnemental de nos opérations",
        slug: "evenements-durables-charte-zero-carbone",
        date: "18 avril 2024",
        category: "RSE",
        readTime: "7 min",
        publisher: "Thomas Leroy",
        publisherRole: "Responsable RSE",
        publisherImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        tags: ["RSE", "événementiel", "durabilité"],
        paragraphs: [
          {
            type: "text",
            content: "L'événementiel représente un défi majeur en termes d'impact environnemental. Notre charte Zéro Carbone, développée avec le WWF, offre un cadre concret pour concilier impact marketing et responsabilité écologique."
          },
          {
            type: "subtitle",
            content: "Les 5 piliers de notre approche"
          },
          {
            type: "text",
            content: "1. Logistique décarbonée :"
          },
          {
            type: "list",
            items: [
              "Flotte de véhicules électriques avec bornes sur site",
              "Optimisation des transports via IA (réduction de 40% des km parcourus)",
              "Compensation carbone systématique via projets certifiés"
            ]
          },
          {
            type: "text",
            content: "2. Alimentation responsable :"
          },
          {
            type: "list",
            items: [
              "100% des repas végétariens avec option végane",
              "Approvisionnement local dans un rayon de 150km maximum",
              "Suppression totale du gaspillage alimentaire"
            ]
          },
          {
            type: "text",
            content: "3. Digitalisation intelligente :"
          },
          {
            type: "list",
            items: [
              "Badges digitaux et applications hybrides",
              "Streaming éco-conçu pour les participants distants",
              "Serveurs alimentés par énergie renouvelable"
            ]
          },
          {
            type: "text",
            content: "4. Supports éco-conçus :"
          },
          {
            type: "list",
            items: [
              "Encres végétales et papiers recyclés",
              "PLV réutilisable sur 3 ans minimum",
              "Goodies utiles et durables (pas d'objets promotionnels jetables)"
            ]
          },
          {
            type: "text",
            content: "5. Mesure et transparence :"
          },
          {
            type: "list",
            items: [
              "Bilan carbone détaillé pour chaque événement",
              "Affichage public de l'impact",
              "Engagement de réduction année après année"
            ]
          },
          {
            type: "subtitle",
            content: "Résultats et retours clients"
          },
          {
            type: "text",
            content: "Depuis l'implémentation :"
          },
          {
            type: "list",
            items: [
              "65% de réduction d'émissions en moyenne",
              "92% des participants trouvent l'approche valorisante",
              "37% des clients ont adopté tout ou partie de la charte"
            ]
          },
          {
            type: "conclusion",
            content: "La durabilité n'est plus une contrainte mais un levier de différenciation et d'engagement. Notre charte prouve qu'on peut concilier excellence événementielle et responsabilité écologique."
          }
        ],
        gallery: [
          "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
        ],
        relatedArticles: [1, 6, 7]
      }
    
  ];

  useEffect(() => {
    const fetchArticle = () => {
      setLoading(true);
      const foundArticle = blogPosts.find(post => post.id === parseInt(id));
      
      if (foundArticle) {
        setArticle(foundArticle);
      } else {
        navigate('/blog');
      }
      
      setLoading(false);
    };

    fetchArticle();
    window.scrollTo(0, 0);
  }, [id, navigate]);

  const nextImage = () => {
    if (article) {
      setCurrentImageIndex((currentImageIndex + 1) % article.gallery.length);
    }
  };

  const prevImage = () => {
    if (article) {
      setCurrentImageIndex((currentImageIndex - 1 + article.gallery.length) % article.gallery.length);
    }
  };

  const chunkGalleryIntoPairs = (gallery) => {
    const pairs = [];
    for (let i = 0; i < gallery.length; i += 2) {
      const pair = gallery.slice(i, i + 2);
      pairs.push(pair);
    }
    return pairs;
  };

  if (loading) {
    return (
      <div className="blogdetail-loading-container">
        <div className="blogdetail-loading-spinner"></div>
        <p>Chargement de l'article...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="blogdetail-error-container">
        <h2>Article non trouvé</h2>
        <button onClick={() => navigate('/blog')}>Retour au blog</button>
      </div>
    );
  }

  const galleryPairs = article.gallery ? chunkGalleryIntoPairs(article.gallery) : [];

  const renderParagraph = (paragraph, index) => {
    switch(paragraph.type) {
      case 'subtitle':
        return <h3 key={index} className="blogdetail-article-subtitle">{paragraph.content}</h3>;
      case 'text':
        return <p key={index} className="blogdetail-article-paragraph">{paragraph.content}</p>;
      case 'list':
        return (
          <ul key={index} className="blogdetail-article-list">
            {paragraph.items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        );
      case 'conclusion':
        return <div key={index} className="blogdetail-article-conclusion">{paragraph.content}</div>;
      default:
        return <p key={index}>{paragraph.content}</p>;
    }
  };

  return (
    <div className={`blogdetail-app-container ${sidebarOpen ? 'blogdetail-sidebar-open' : ''}`}>
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />

      <div className={`blogdetail-main-content ${sidebarOpen ? 'content-shifted' : ''}`}>
        {/* Hero Image Section */}
        <div className="hero-image-container">
          <img src={article.image} alt={article.title} className="hero-image" />
          <div className="hero-overlay">
            <h1 className="hero-title">{article.title}</h1>
          </div>
        </div>

        <div className="blogdetail-container">
          <div className="blogdetail-header">
            <div className="blogdetail-header-meta">
              <span className="blogdetail-header-category">{article.category}</span>
              <span className="blogdetail-header-date">{article.date} • {article.readTime}</span>
            </div>
            <h2 className="blogdetail-header-subtitle">{article.subtitle}</h2>

             {/* Author section */}
             <div className="blogdetail-author-info">
              <img src={article.publisherImage} alt={article.publisher} className="blogdetail-author-image" />
              <div className="blogdetail-author-details">
                <span className="blogdetail-author-name">{article.publisher}</span>
                <span className="blogdetail-author-role">{article.publisherRole}</span>
              </div>
            </div>
            
            {/* Tags and Share moved here above author */}
            <div className="blogdetail-tags-share-container">
              <div className="blogdetail-tags">
                <h4>Tags</h4>
                <div className="blogdetail-tags-container">
                  {article.tags.map((tag, index) => (
                    <span key={index} className="blogdetail-tag">{tag}</span>
                  ))}
                </div>
                
              </div>

              
            </div>
            <div className="blogdetail-share-article">
                <h4>Partager</h4>
                <div className="blogdetail-social-icons">
                  <a href="#" className="blogdetail-social-icon"><i className="fab fa-linkedin"></i></a>
                  <a href="#" className="blogdetail-social-icon"><i className="fab fa-twitter"></i></a>
                  <a href="#" className="blogdetail-social-icon"><i className="fab fa-facebook"></i></a>
                  <a href="#" className="blogdetail-social-icon"><i className="fas fa-envelope"></i></a>
                </div>
              </div>
          </div>

          <div className="blogdetail-content-wrapper">
            <div className="blogdetail-content">
              {article.paragraphs.map((paragraph, index) => (
                renderParagraph(paragraph, index)
              ))}

              {/* Gallery */}
              <div className="blogdetail-gallery">
                <h3 className="gallery-title">GALERIE</h3>
                <div className="gallery-grid-container">
                  {galleryPairs.map((pair, pairIndex) => (
                    <div key={pairIndex} className="gallery-pair">
                      {pair.map((image, imgIndex) => (
                        <div 
                          key={imgIndex} 
                          className={`gallery-item ${
                            pairIndex % 2 === 0 ? 
                              (imgIndex % 2 === 0 ? 'tall' : 'short') : 
                              (imgIndex % 2 === 0 ? 'short' : 'tall')
                          }`}
                        >
                          <img 
                            src={image} 
                            alt={`${article.title} - image ${pairIndex * 2 + imgIndex + 1}`} 
                            className="gallery-image"
                          />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {article.relatedArticles && article.relatedArticles.length > 0 && (
            <div className="blogdetail-related-articles">
              <h3>Articles similaires</h3>
              <div className="blogdetail-related-articles-grid">
                {blogPosts
                  .filter(post => post.id !== article.id)
                  .map(relatedArticle => (
                    <div 
                      key={relatedArticle.id}
                      className="blogdetail-related-article-card"
                      onClick={() => {
                        navigate(`/blog/${relatedArticle.id}`);
                        window.scrollTo(0, 0);
                      }}
                    >
                      <div className="blogdetail-related-article-image">
                        <img src={relatedArticle.image} alt={relatedArticle.title} />
                        <span className="blogdetail-related-article-category">{relatedArticle.category}</span>
                      </div>
                      <div className="blogdetail-related-article-content">
                        <h4>{relatedArticle.title}</h4>
                        <button className="blogdetail-read-more-btn">
                          Lire l'article <i className="fas fa-arrow-right"></i>
                        </button>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          )}

          <div className="blogdetail-newsletter-section">
            <div className="blogdetail-newsletter-content">
              <h2>Abonnez-vous à notre newsletter</h2>
              <p>
                Recevez nos derniers articles, tutoriels et ressources directement 
                dans votre boîte de réception.
              </p>
              <form className="blogdetail-newsletter-form" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="Votre adresse email" 
                  required 
                />
                <button type="submit">
                  S'abonner <i className="fas fa-paper-plane"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <ScrollTop/>
      <GoBack />
    </div>
  );
};

export default BlogDetails;