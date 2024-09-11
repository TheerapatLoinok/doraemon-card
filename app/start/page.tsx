"use client";
import { useEffect, useState } from "react";
import rulesData from "../constant/deck.json";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FcInfo } from "react-icons/fc";
import { Modal } from "@mantine/core";

type DeckType = {
  card: string;
  type: string;
};

interface Rule {
  card: string;
  action?: string;
}
type RulesData = {
  rules: Rule[];
};

function page() {
  const router = useRouter();
  const [deck, setDeck] = useState<DeckType[]>([]);
  const [drawnCard, setDrawnCard] = useState<DeckType[]>([]);
  const [rules, setRules] = useState<RulesData>();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const handleGoBack = () => {
    Swal.fire({
      title: "คุณต้องการกลับไปหน้าหลักหรือไม่ ?",
      showCancelButton: true,
      confirmButtonText: "Yes",
      confirmButtonColor: "#15803d",
    }).then((result) => {
      router.push("/");
    });
  };
  const handleRestartGame = () => {
    Swal.fire({
      title: "คุณต้องการเริ่มเกมใหม่หรือไม่ ?",
      showCancelButton: true,
      confirmButtonText: "Yes",
      confirmButtonColor: "#15803d",
    }).then((result) => {
      setDeck(createDeck());
      setDrawnCard([]);
    });
  };
  const createDeck = () => {
    const suits = ["hearts", "diamonds", "clubs", "spades"];
    const ranks = [
      "ace",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "jack",
      "queen",
      "king",
    ];
    const deck: DeckType[] = [];

    suits.forEach((suit) => {
      ranks.forEach((rank) => {
        deck.push({ card: rank, type: suit });
      });
    });

    return deck;
  };
  const drawCard = () => {
    const randomIndex = Math.floor(Math.random() * deck.length);
    const card = deck[randomIndex];
    const drawn = [...drawnCard];
    drawn.push(card);
    const updatedDeck = [...deck];
    updatedDeck.splice(randomIndex, 1);
    setDeck(updatedDeck);
    setDrawnCard(drawn);
    Swal.fire({
      title: `${card.card} ${card.type}`,
      text: rules?.rules.filter((r) => r.card === card.card)[0]?.action,
      imageUrl: `/images/${card.type}/${card.card}.png`,
      imageWidth: 200,
      imageHeight: 300,
      imageAlt: "Custom image",
    });
  };
  useEffect(() => {
    const localStorageRules = localStorage.getItem("localStorageRules");
    if (!localStorageRules || localStorageRules === null) {
      localStorage.setItem("localStorageRules", JSON.stringify(rulesData));
      setRules(rulesData);
    } else {
      setRules(JSON.parse(localStorageRules));
    }
  }, []);
  useEffect(() => {
    setDeck(createDeck());
  }, []);

  return (
    <div className="min-h-screen overflow-hidden content-center p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-6 row-start-2 items-center relative">
        <div className="flex gap-4">
          <button
            onClick={() => handleRestartGame()}
            disabled={deck.length >= 52}
            className=" py-2 px-4 bg-blue-600 disabled:bg-black disabled:opacity-40 text-white text-base rounded-lg"
          >
            เริ่มเกมใหม่
          </button>
          <button
            onClick={() => handleGoBack()}
            className=" py-2 px-4 bg-red-500 text-white text-base rounded-lg"
          >
            ออกจากเกม
          </button>
        </div>

        <div className="flex flex-col gap-4 items-center">
          <div className="flex gap-2 items-center">
            <p className="text-2xl font-bold text-center">
              จำนวนไพ่เหลือ {deck.length} ใบ
            </p>
            <button onClick={() => setIsOpenModal(true)}>
              <FcInfo size={24} />
            </button>
            <Modal
              opened={isOpenModal}
              onClose={() => setIsOpenModal(false)}
              centered
              withCloseButton={true}
              fullScreen={true}
            >
              <div className="flex justify-center flex-wrap w-full h-[300px]  gap-2 gap-y-6 p-4">
                {drawnCard.length > 0 ? (
                  <>
                    {drawnCard.map((card, index) => (
                      <div
                        key={index}
                        className=" w-[100px] flex flex-col gap-2"
                      >
                        <div className="relative w-[100px] h-[150px]">
                          <Image
                            alt="Card image"
                            src={`/images/${card.type}/${card.card}.png`}
                            fill
                            priority
                          />
                        </div>
                        <p className="text-sm font-normal text-center ">
                          {card.card} {card.type}
                        </p>
                      </div>
                    ))}
                  </>
                ) : (
                  <p className="text-center text-base font-medium content-center">
                    ยังไม่มีไพ่ที่ถูกเปิดในตอนนี้
                  </p>
                )}
              </div>
            </Modal>
          </div>
          <div className="w-[300px] h-[500px] rounded-lg bg-white p-2">
            <div className="bg-[#6345ED] bg-opacity-60 rounded-lg w-full h-full relative">
              <Image
                className="object-cover"
                src="/images/card-background-2.png"
                alt="Image back card"
                fill
                quality={80}
                priority
              />
            </div>
          </div>
        </div>
        <button
          onClick={() => drawCard()}
          disabled={deck.length <= 0}
          className="bg-[#6345ED] disabled:bg-black disabled:opacity-40 hover:bg-opacity-70 text-white text-4xl px-4 py-2 rounded-lg"
        >
          เปิดไพ่
        </button>
      </main>
    </div>
  );
}

export default page;
