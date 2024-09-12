import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen content-center  p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col-reverse md:flex-row justify-center gap-8">
        <div className="flex flex-col w-full md:w-[300px] lg:w-[500px]">
          <h1 className="text-center md:text-start font-semibold text-[40px] lg:text-[60px] xl:text-[70px] text-white">
            เกมไพ่โดเรม่อน
          </h1>
          <p className="mt-8 text-6 text-white font-normal">
            สนุกไปกับการเล่นไพ่โดเรม่อนที่เต็มไปด้วยความตื่นเต้นและเสียงหัวเราะ!เกมนี้จะท้าทายความคิดสร้างสรรค์ของคุณในการสร้างสถานการณ์สุดฮา
            โดยมีการ์ดที่กำหนดกิจกรรมและกฎที่ต้องทำตามทำให้ทุกคนได้มีส่วนร่วมและสนุกสนานไปพร้อมกัน!
          </p>
          <div className="flex flex-col md:flex-row justify-between md:justify-start gap-4 md:gap-6 mt-[80px]">
            <Link href="/start" prefetch>
              <button className="py-2 text-6 text-white bg-[#6345ED] hover:bg-opacity-80 rounded-lg w-full md:w-[160px]">
                เริ่มเกม
              </button>
            </Link>
            <Link href="/game-setting" prefetch>
              <button className="py-2 text-6  bg-transparent border-[1px] text-[#6345ED] hover:text-white hover:text-opacity-80  border-[#6345ED] hover:border-white hover:border-opacity-80  rounded-lg w-full md:w-[160px]">
                ตั้งค่าเกม
              </button>
            </Link>
          </div>
        </div>
        <div className=" w-full h-[400px] md:w-[400px]  lg:w-[500px]  relative">
          <Image
            className="pr-5 md:pr-0"
            src="https://theerapatloinok.github.io/doraemon-card/images/doraemon-logo.png"
            alt="Doraemon game card"
            fill
            quality={80}
          />
        </div>
      </main>
      <footer>
        <p className="mt-10 text-sm text-white text-opacity-70 pl-0 xl:pl-[120px]">
          Beta 1.0.0
        </p>
      </footer>
    </div>
  );
}
