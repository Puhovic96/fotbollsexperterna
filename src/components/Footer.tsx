const Footer = () => {
  return (
    <footer className="bg-football-green-dark border-t-4 border-goal-gold mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Brand */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-field-white mb-2">
              Football Fun Hub
            </h3>
            <p className="text-field-white/80">
              Din destination för fotbollskul och kunskap
            </p>
          </div>

          {/* Google AdSense Space */}
          <div className="text-center">
            <div className="bg-field-white/10 border-2 border-dashed border-field-white/20 rounded-lg p-4 min-h-[120px] flex items-center justify-center">
              <p className="text-field-white/60 text-sm">
                Google AdSense
                <br />
                Annonsplats
              </p>
            </div>
          </div>

          {/* Affiliate Links */}
          <div className="text-center md:text-right">
            <div className="bg-field-white/10 border-2 border-dashed border-field-white/20 rounded-lg p-4">
              <h4 className="text-field-white font-semibold mb-2">
                Visa vilket lag du hejar på!
              </h4>
              <div className="space-y-2">
                <a 
                  href="#" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block bg-goal-gold text-football-green-dark px-4 py-2 rounded font-medium hover:bg-goal-gold-light transition-colors"
                >
                  Köp matchtröja →
                </a>
                <a 
                  href="#" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block bg-field-white/20 text-field-white px-4 py-2 rounded font-medium hover:bg-field-white/30 transition-colors"
                >
                  Fotbollsskor →
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-field-white/20 mt-6 pt-6 text-center">
          <p className="text-field-white/60 text-sm">
            © 2024 Football Fun Hub. Alla rättigheter förbehållna.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;