import Link from "next/link";
import { MessageCircle, MapPin, Sparkles, ArrowRight, ShieldCheck, Truck, Ruler, Phone } from "lucide-react";
import { SITE } from "@/lib/site";

export const metadata = {
  title: "Craftiva Furniture — Bespoke Living, Handcrafted in Kirti Nagar",
  description: "Solid Sheesham beds, tailored sectional sofas, sintered stone case goods, and architectural dining suites. Handcrafted in our Kirti Nagar workshop with zero retail markups.",
};

export default function HomePage() {
  return (
    <div className="bg-[#F7F5F0] text-[#191613] min-h-screen">
      
      {/* LUXURY EDITORIAL HERO COVER */}
      <section className="wrap pt-6 pb-12">
        <div className="bg-[#1E1916] text-[#FAF7F2] rounded-3xl p-6 sm:p-12 lg:p-14 shadow-2xl relative overflow-hidden grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#B08D5B]/40 bg-[#B08D5B]/15 px-3 py-1 mb-4 backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-[#B08D5B] animate-pulse"></span>
              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#B08D5B]">
                Volume 2026 · Master Catalogue
              </p>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal leading-[1.1] mb-4">
              Bespoke Living,<br />
              <span className="italic">Handcrafted in Delhi.</span>
            </h1>
            <p className="text-sm sm:text-base text-[#FAF7F2]/85 leading-relaxed max-w-xl mb-6">
              Solid Sheesham beds, tailored sectional sofas, sintered stone case goods, and architectural dining suites. Hand-joined directly in our Kirti Nagar workshop with zero showroom markups.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#catalogue"
                className="bg-[#B08D5B] text-[#191613] hover:bg-[#c7a26f] font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-full transition-all shadow-lg inline-flex items-center gap-2"
              >
                Explore Catalogue ↓
              </a>
              <a
                href={`https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent("Hi Craftiva! I'd like to commission a custom furniture piece.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/30 hover:bg-white/10 text-[#FAF7F2] font-semibold text-xs uppercase tracking-wider px-6 py-3.5 rounded-full transition-all inline-flex items-center gap-2"
              >
                <MessageCircle size={14} /> Commission a Piece
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-white/10 bg-[#2b2521] relative group">
              <img
                src="/Catalogue_Images_For_Drive/01_Riviera_Bed_Main.jpg"
                alt="Riviera Ash Bed"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur text-white text-[10px] px-3 py-1 rounded-full">
                Featured · Riviera Bed
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK STATS STRIP */}
      <div className="border-y border-[#E5DFD5] bg-[#EFE9E0]/60 py-4">
        <div className="wrap flex justify-between items-center overflow-x-auto gap-6 text-xs uppercase tracking-wider font-semibold text-[#6b4a2f] whitespace-nowrap">
          <span>🪵 100% Solid Hardwoods</span>
          <span>⚡ 10–14 Days NCR Lead Time</span>
          <span>🛋️ Bespoke Room Sizing</span>
          <span>📍 Kirti Nagar Factory Direct</span>
          <span>🛡️ 5-Year Structural Warranty</span>
        </div>
      </div>

      {/* THE MASTER CATALOGUE SECTIONS */}
      <div className="wrap py-14 space-y-16" id="catalogue">

        {/* 01: BEDROOM SUITES */}
        <section id="bedroom" className="space-y-6">
          <div className="border-b border-[#E5DFD5] pb-3 flex flex-wrap justify-between items-end gap-2">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8C6F47]">Chapter 01</p>
              <h2 className="font-serif text-2xl sm:text-4xl text-[#191613]">The Bedroom Suites</h2>
            </div>
            <p className="text-xs text-[#736C64]">Riviera Bed · Madrid Velvet Bed · Kennedy Bedside · Archie Dresser</p>
          </div>

          {/* Hero Bed: Riviera */}
          <div className="bg-white rounded-2xl border border-[#E5DFD5] overflow-hidden grid lg:grid-cols-12 shadow-sm hover:shadow-md transition-shadow">
            <div className="lg:col-span-7 aspect-[4/3] sm:aspect-[16/10] bg-[#FAF8F5] relative group">
              <img
                src="/Catalogue_Images_For_Drive/01_Riviera_Bed_Main.jpg"
                alt="Riviera Isabelline Bed"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C6F47]">Bestseller · Ash Veneer</span>
                <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#191613] mt-1">The Riviera Isabelline Bed</h3>
                <p className="text-lg font-semibold text-[#1E1916] mt-1">₹56,000 <span className="text-xs font-normal text-[#736C64]">(Queen) / ₹62,000 (King)</span></p>
                <p className="text-xs sm:text-sm text-[#736C64] mt-3 leading-relaxed">
                  Isabelline white textured upholstery framed with a medium brown solid ash wood veneer platform. Features an architectural extended headboard.
                </p>
                <div className="grid grid-cols-2 gap-2 mt-4 text-[11px] text-[#736C64]">
                  <div className="bg-[#FAF8F5] p-2 rounded-lg"><strong className="text-[#191613] block">Material:</strong> Ash Veneer + Fabric</div>
                  <div className="bg-[#FAF8F5] p-2 rounded-lg"><strong className="text-[#191613] block">Lead Time:</strong> 10–14 Days NCR</div>
                </div>
              </div>
              <a
                href={`https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent("Hi Craftiva! I'm interested in The Riviera Isabelline Bed (₹56,000).")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center justify-center gap-2 bg-[#1E1916] hover:bg-[#8C6F47] text-white text-xs font-semibold uppercase tracking-wider py-3 px-6 rounded-full transition-colors"
              >
                <MessageCircle size={14} /> Inquire on WhatsApp
              </a>
            </div>
          </div>

          {/* Dual Bedroom Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-[#E5DFD5] overflow-hidden flex flex-col justify-between shadow-sm">
              <div className="aspect-[16/11] bg-[#FAF8F5] overflow-hidden">
                <img src="/Catalogue_Images_For_Drive/02_Madrid_Bed_Main.jpg" alt="Madrid Velvet Bed" className="w-full h-full object-cover" />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#8C6F47]">Luxury Velvet</span>
                  <h4 className="font-serif text-xl font-medium text-[#191613]">The Madrid Cream Velvet Bed</h4>
                  <p className="text-sm font-semibold text-[#1E1916] mt-0.5">₹54,000 <span className="text-xs font-normal text-[#736C64]">(Queen)</span></p>
                  <p className="text-xs text-[#736C64] mt-2">Vertical channel-tufted headboard with optional German gas-lift hydraulic storage.</p>
                </div>
                <a
                  href={`https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent("Hi Craftiva! I'm interested in The Madrid Bed (₹54,000).")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#1E1916] hover:text-[#8C6F47]"
                >
                  Inquire on WhatsApp →
                </a>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#E5DFD5] overflow-hidden flex flex-col justify-between shadow-sm">
              <div className="aspect-[16/11] bg-[#FAF8F5] overflow-hidden">
                <img src="/Catalogue_Images_For_Drive/03_Kennedy_Bedside_Main.jpg" alt="Kennedy Bedside Table" className="w-full h-full object-cover" />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#8C6F47]">Sintered Stone</span>
                  <h4 className="font-serif text-xl font-medium text-[#191613]">Kennedy Bedside Table</h4>
                  <p className="text-sm font-semibold text-[#1E1916] mt-0.5">₹16,000 <span className="text-xs font-normal text-[#736C64]">(Single) / ₹30,000 (Pair)</span></p>
                  <p className="text-xs text-[#736C64] mt-2">White sintered stone marble-look top over 3 soft-close drawers with satin brass pulls.</p>
                </div>
                <a
                  href={`https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent("Hi Craftiva! I'm interested in The Kennedy Bedside Table (₹16,000).")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#1E1916] hover:text-[#8C6F47]"
                >
                  Inquire on WhatsApp →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 02: LIVING & SOFAS */}
        <section id="living" className="space-y-6">
          <div className="border-b border-[#E5DFD5] pb-3 flex flex-wrap justify-between items-end gap-2">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8C6F47]">Chapter 02</p>
              <h2 className="font-serif text-2xl sm:text-4xl text-[#191613]">Living &amp; Sofas</h2>
            </div>
            <p className="text-xs text-[#736C64]">Antonella Sofa · Ava Sofa · Elianna Sofa · Kelly Ottoman · Carlo Chair</p>
          </div>

          {/* Hero Sofa: Antonella */}
          <div className="bg-white rounded-2xl border border-[#E5DFD5] overflow-hidden grid lg:grid-cols-12 shadow-sm hover:shadow-md transition-shadow">
            <div className="lg:col-span-7 aspect-[4/3] sm:aspect-[16/10] bg-[#FAF8F5] relative group">
              <img
                src="/Catalogue_Images_For_Drive/05_Antonella_Sofa_Main.jpg"
                alt="Antonella Stone Cream Sofa"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C6F47]">Living Bestseller · 3-Seater</span>
                <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#191613] mt-1">The Antonella Stone Cream Sofa</h3>
                <p className="text-lg font-semibold text-[#1E1916] mt-1">₹46,000 <span className="text-xs font-normal text-[#736C64]">(86″ Length)</span></p>
                <p className="text-xs sm:text-sm text-[#736C64] mt-3 leading-relaxed">
                  Crafted in stone cream textured woven fabric with generous deep seating, 40-density high-resilience foam cushions, and kiln-dried internal hardwood.
                </p>
                <div className="grid grid-cols-2 gap-2 mt-4 text-[11px] text-[#736C64]">
                  <div className="bg-[#FAF8F5] p-2 rounded-lg"><strong className="text-[#191613] block">Cushioning:</strong> 40-Density HR</div>
                  <div className="bg-[#FAF8F5] p-2 rounded-lg"><strong className="text-[#191613] block">Dimensions:</strong> 86″ × 38″ × 32″</div>
                </div>
              </div>
              <a
                href={`https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent("Hi Craftiva! I'm interested in The Antonella Stone Cream Sofa (₹46,000).")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center justify-center gap-2 bg-[#1E1916] hover:bg-[#8C6F47] text-white text-xs font-semibold uppercase tracking-wider py-3 px-6 rounded-full transition-colors"
              >
                <MessageCircle size={14} /> Inquire on WhatsApp
              </a>
            </div>
          </div>

          {/* Dual Living Grid */}
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl border border-[#E5DFD5] overflow-hidden flex flex-col justify-between shadow-sm">
              <div className="aspect-[16/11] bg-[#FAF8F5] overflow-hidden">
                <img src="/Catalogue_Images_For_Drive/06_Ava_Sofa_Main.jpg" alt="Ava Sofa" className="w-full h-full object-cover" />
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#8C6F47]">Cloud Comfort</span>
                  <h4 className="font-serif text-lg font-medium text-[#191613]">The Ava Cream Sofa</h4>
                  <p className="text-xs font-semibold text-[#1E1916] mt-0.5">₹44,000 (3-Seater)</p>
                </div>
                <a href={`https://wa.me/${SITE.whatsappNumber}?text=Hi!+Interested+in+Ava+Sofa`} target="_blank" className="mt-3 text-xs font-bold text-[#1E1916] hover:text-[#8C6F47]">Inquire →</a>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#E5DFD5] overflow-hidden flex flex-col justify-between shadow-sm">
              <div className="aspect-[16/11] bg-[#FAF8F5] overflow-hidden">
                <img src="/Catalogue_Images_For_Drive/07_Elianna_Sofa_Main.jpg" alt="Elianna Sofa" className="w-full h-full object-cover" />
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#8C6F47]">Track Arm</span>
                  <h4 className="font-serif text-lg font-medium text-[#191613]">The Elianna Sofa</h4>
                  <p className="text-xs font-semibold text-[#1E1916] mt-0.5">₹48,000 (3-Seater)</p>
                </div>
                <a href={`https://wa.me/${SITE.whatsappNumber}?text=Hi!+Interested+in+Elianna+Sofa`} target="_blank" className="mt-3 text-xs font-bold text-[#1E1916] hover:text-[#8C6F47]">Inquire →</a>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#E5DFD5] overflow-hidden flex flex-col justify-between shadow-sm">
              <div className="aspect-[16/11] bg-[#FAF8F5] overflow-hidden">
                <img src="/Catalogue_Images_For_Drive/08_Kelly_Ottoman_Main.jpg" alt="Kelly Ottoman" className="w-full h-full object-cover" />
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#8C6F47]">Accent Velvet</span>
                  <h4 className="font-serif text-lg font-medium text-[#191613]">Kelly Velvet Ottoman</h4>
                  <p className="text-xs font-semibold text-[#1E1916] mt-0.5">₹12,000 (Single)</p>
                </div>
                <a href={`https://wa.me/${SITE.whatsappNumber}?text=Hi!+Interested+in+Kelly+Ottoman`} target="_blank" className="mt-3 text-xs font-bold text-[#1E1916] hover:text-[#8C6F47]">Inquire →</a>
              </div>
            </div>
          </div>
        </section>

        {/* 03: CASE GOODS & DINING */}
        <section id="dining" className="space-y-6">
          <div className="border-b border-[#E5DFD5] pb-3 flex flex-wrap justify-between items-end gap-2">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8C6F47]">Chapter 03 &amp; 04</p>
              <h2 className="font-serif text-2xl sm:text-4xl text-[#191613]">Case Goods &amp; Dining Suites</h2>
            </div>
            <p className="text-xs text-[#736C64]">Xandra Entertainment · Douglas Tatami · Solid Sheesham Dining · Hargrove Round</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl border border-[#E5DFD5] overflow-hidden flex flex-col justify-between shadow-sm">
              <div className="aspect-[16/11] bg-[#FAF8F5] overflow-hidden">
                <img src="/Catalogue_Images_For_Drive/10_Xandra_Entertainment_Main.jpg" alt="Xandra Dark Entertainment Unit" className="w-full h-full object-cover" />
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#8C6F47]">Dark Walnut</span>
                  <h4 className="font-serif text-base font-medium text-[#191613]">Xandra Entertainment Unit</h4>
                  <p className="text-xs font-semibold text-[#1E1916] mt-0.5">₹32,000 (78″)</p>
                </div>
                <a href={`https://wa.me/${SITE.whatsappNumber}?text=Hi!+Interested+in+Xandra+Unit`} target="_blank" className="mt-3 text-xs font-bold text-[#1E1916] hover:text-[#8C6F47]">Inquire →</a>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#E5DFD5] overflow-hidden flex flex-col justify-between shadow-sm">
              <div className="aspect-[16/11] bg-[#FAF8F5] overflow-hidden">
                <img src="/Catalogue_Images_For_Drive/11_Douglas_Tatami_Wardrobe_Main.jpg" alt="Douglas Tatami Wardrobe" className="w-full h-full object-cover" />
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#8C6F47]">Natural Rattan</span>
                  <h4 className="font-serif text-base font-medium text-[#191613]">Douglas Tatami Wardrobe</h4>
                  <p className="text-xs font-semibold text-[#1E1916] mt-0.5">₹48,000 (38″)</p>
                </div>
                <a href={`https://wa.me/${SITE.whatsappNumber}?text=Hi!+Interested+in+Douglas+Wardrobe`} target="_blank" className="mt-3 text-xs font-bold text-[#1E1916] hover:text-[#8C6F47]">Inquire →</a>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#E5DFD5] overflow-hidden flex flex-col justify-between shadow-sm">
              <div className="aspect-[16/11] bg-[#FAF8F5] overflow-hidden">
                <img src="/Catalogue_Images_For_Drive/13_Solid_Sheesham_Dining_Set_Main.jpg" alt="Solid Sheesham Dining Set" className="w-full h-full object-cover" />
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#8C6F47]">6-Seater Suite</span>
                  <h4 className="font-serif text-base font-medium text-[#191613]">Solid Sheesham Dining Set</h4>
                  <p className="text-xs font-semibold text-[#1E1916] mt-0.5">₹52,000 (Table + 6 Chairs)</p>
                </div>
                <a href={`https://wa.me/${SITE.whatsappNumber}?text=Hi!+Interested+in+Sheesham+Dining+Set`} target="_blank" className="mt-3 text-xs font-bold text-[#1E1916] hover:text-[#8C6F47]">Inquire →</a>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#E5DFD5] overflow-hidden flex flex-col justify-between shadow-sm">
              <div className="aspect-[16/11] bg-[#FAF8F5] overflow-hidden">
                <img src="/Catalogue_Images_For_Drive/14_Hargrove_Round_Dining_Main.jpg" alt="Hargrove Round Dining" className="w-full h-full object-cover" />
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#8C6F47]">Round Pedestal</span>
                  <h4 className="font-serif text-base font-medium text-[#191613]">Hargrove Round Dining Set</h4>
                  <p className="text-xs font-semibold text-[#1E1916] mt-0.5">₹46,000 (48″ + 4 Chairs)</p>
                </div>
                <a href={`https://wa.me/${SITE.whatsappNumber}?text=Hi!+Interested+in+Hargrove+Dining+Set`} target="_blank" className="mt-3 text-xs font-bold text-[#1E1916] hover:text-[#8C6F47]">Inquire →</a>
              </div>
            </div>
          </div>
        </section>

        {/* WORKSHOP & DIRECT VISIT STATEMENT */}
        <section className="bg-[#242D21] text-[#FAF7F2] rounded-3xl p-8 sm:p-12 grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <h3 className="font-serif text-3xl sm:text-4xl leading-tight mb-4">
              Crafted in Kirti Nagar.<br />
              Delivered Across Delhi-NCR.
            </h3>
            <p className="text-sm text-[#FAF7F2]/85 leading-relaxed mb-6">
              We do not mass-produce for warehouse shelves. Every piece is built to order in our 3rd-floor Timber Block workshop. Bring your floor plan, Pinterest reference, or room dimensions.
            </p>
            <a
              href={`https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent("Hi Craftiva! I'd like to visit the Kirti Nagar workshop.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#B08D5B] text-[#191613] hover:bg-[#c7a26f] font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-full transition-all inline-flex items-center gap-2"
            >
              Schedule Workshop Visit →
            </a>
          </div>

          <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-left border-white/20 pt-6 lg:pt-0 lg:pl-8 text-xs leading-loose text-[#FAF7F2]/85">
            <p><strong>📍 Workshop Address:</strong> {SITE.address}</p>
            <p><strong>🪵 Timber Standard:</strong> 100% Kiln-Dried Solid Hardwoods &amp; 18mm BWR Marine Ply</p>
            <p><strong>⏱️ Turnaround:</strong> 10–14 working days made to order</p>
            <p><strong>🚚 Delivery &amp; Setup:</strong> On-site installation by workshop technicians</p>
            <p><strong>📞 Direct Helpline:</strong> {SITE.whatsappDisplay}</p>
          </div>
        </section>

      </div>

    </div>
  );
}