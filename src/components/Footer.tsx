const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-border mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-white mb-3">
              Fotbollsexperterna
            </h3>
            <p className="text-gray-400">
              Din professionella destination för fotbollskunskap och underhållning
            </p>
          </div>

          {/* AdSense Space */}
          <div className="text-center">
            <div className="bg-gray-800 border-2 border-dashed border-gray-700 rounded-lg p-6 min-h-[120px] flex items-center justify-center">
              <div className="text-gray-500">
                <p className="text-sm font-medium">Annonsplats</p>
                <p className="text-xs">Google AdSense</p>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="text-center md:text-right">
            <div className="bg-gray-800 rounded-lg p-6">
              <h4 className="text-white font-semibold mb-4">
                Fotbollsprodukter
              </h4>
              <div className="space-y-3">
                <a 
                  href="#" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block bg-primary text-white px-4 py-2 rounded font-medium hover:bg-primary/90 transition-colors"
                >
                  Matchtröjor →
                </a>
                <a 
                  href="#" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block bg-gray-700 text-white px-4 py-2 rounded font-medium hover:bg-gray-600 transition-colors"
                >
                  Fotbollsskor →
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © 2024 Fotbollsexperterna. Alla rättigheter förbehållna.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;