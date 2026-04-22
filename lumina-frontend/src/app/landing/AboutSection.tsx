import Image from 'next/image';

export default function AboutSection() {
  return (
    <section
      id="about"
      className="w-full bg-[#F9D5DF] py-15 px-6"
    >
      <div className="max-w-6xl mx-auto flex items-center gap-10 flex-wrap md:flex-nowrap">
        
        <div className="relative w-full md:w-[400px] h-[500px] flex-shrink-0">
          <Image
            src="/side-left-landing-photo.png"
            alt="Guía de maquillaje Lúmina"
            fill
            className="object-cover"
          />
        </div>

        <div className="flex flex-col gap-10 flex-1">
          <h2 className="text-4xl font-bold text-[#C4527B] leading-snug text-center md:text-right">
            Tu guía confiable en el<br />mundo del maquillaje
          </h2>

          <div className="flex gap-25 justify-center md:justify-end">
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center text-2xl">
                💬
              </div>
              <span className="font-semibold text-[#C4527B] text-3xl">Reseñas</span>
              <p className="text-xl text-gray-500 text-center max-w-[110px]">
                Deja y observa reseñas de otros usuarios
              </p>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center text-2xl">
                ✨
              </div>
              <span className="font-semibold text-[#C4527B] text-3xl">Sugerencias</span>
              <p className="text-xl text-gray-500 text-center max-w-[110px]">
                Elige productos y obtén sugerencias de estilos
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
