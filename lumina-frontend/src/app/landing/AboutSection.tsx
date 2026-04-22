import Image from 'next/image';

export default function AboutSection() {
  return (
    <section
      id="about"
      className="w-full bg-[#F9D5DF] py-16 px-6"
    >
      <div className="max-w-6xl mx-auto flex items-center gap-12 flex-wrap md:flex-nowrap">
        {/* Left - imágenes */}
        <div className="relative w-full md:w-[280px] h-[300px] flex-shrink-0">
          <Image
            src="/side-left-landing-photo.png"
            alt="Guía de maquillaje Lúmina"
            fill
            className="object-cover rounded-2xl shadow-lg"
          />
        </div>

        {/* Right - texto + íconos */}
        <div className="flex flex-col gap-8 flex-1">
          <h2 className="text-3xl font-bold text-[#C4527B] leading-snug text-center md:text-right">
            Tu guía confiable en el<br />mundo del maquillaje
          </h2>

          <div className="flex gap-10 justify-center md:justify-end">
            {/* Reseñas */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center text-2xl">
                💬
              </div>
              <span className="font-semibold text-[#C4527B] text-sm">Reseñas</span>
              <p className="text-xs text-gray-500 text-center max-w-[110px]">
                Deja y observa reseñas de otros usuarios
              </p>
            </div>

            {/* Sugerencias */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center text-2xl">
                ✨
              </div>
              <span className="font-semibold text-[#C4527B] text-sm">Sugerencias</span>
              <p className="text-xs text-gray-500 text-center max-w-[110px]">
                Elige productos y obtén sugerencias de estilos
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
