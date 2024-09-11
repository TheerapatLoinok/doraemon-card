"use client";
import rulesData from "../constant/deck.json";
import { useForm, Controller } from "react-hook-form";
import { notifications } from "@mantine/notifications";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

interface Rule {
  card: string;
  action?: string;
}
type RulesData = {
  rules: Rule[];
};

function page() {
  const [saveAble, setSaveAble] = useState(false);
  const [rules, setRules] = useState<RulesData>(rulesData);
  const router = useRouter();
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      rules: rules.rules,
    },
  });
  const handleResetSettings = () => {
    Swal.fire({
      title: "คุณต้องการรีเซตหรือไม่ ?",
      showCancelButton: true,
      confirmButtonText: "Save",
      confirmButtonColor: "#15803d",
    }).then((result) => {
      if (result.isConfirmed) {
        setValue("rules", rulesData.rules);
        localStorage.setItem("localStorageRules", JSON.stringify(rulesData));
        Swal.fire("สำเร็จ!", "", "success");
      }
    });
  };
  const handleGoBack = () => {
    if (saveAble) {
      Swal.fire({
        title: "คุณต้องการกลับไปหน้าหลักหรือไม่ ?",
        showCancelButton: true,
        confirmButtonText: "Yes",
        confirmButtonColor: "#15803d",
      }).then((result) => {
        router.push("/");
      });
    } else {
      router.push("/");
    }
  };
  const onSubmit = (data: RulesData) => {
    if (data) {
      localStorage.setItem("localStorageRules", JSON.stringify(data));
      notifications.show({
        color: "green",
        title: "สำเร็จ",
        message: "บันทึกการตั้งค่าเกมสำเร็จ",
        position: "bottom-left",
      });
      setSaveAble(false);

      setTimeout(() => {
        router.push("/");
      }, 1500);
    }
  };
  useEffect(() => {
    const localStorageRules = localStorage.getItem("localStorageRules");
    if (localStorageRules) {
      const data = JSON.parse(localStorageRules);
      setRules(data);
    }
  }, []);
  useEffect(() => {
    reset(rules);
  }, [rules, reset]);

  return (
    <div className="min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8  row-start-2 items-center ">
        <h1 className="text-4xl font-bold text-white ">ตั้งค่าเกม</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="h-[calc(100vh_-_350px)] xl:h-[calc(100vh_-_250px)]  overflow-y-scroll">
            {rules.rules.map((rule, index) => {
              const errorMessage = errors.rules?.[index]?.action?.message;
              return (
                <label key={index} className="flex flex-col  my-1">
                  <div className="flex gap-10 w-full bg-[#A3A3A3] hover:bg-[#D9D9D9] rounded-lg ">
                    <p className="w-[140px] text-black text-base font-semibold self-center text-center capitalize">{`Card ${rule.card}`}</p>
                    <Controller
                      name={`rules.${index}.action`}
                      control={control}
                      rules={{ required: `การ์ด ${rule.card} มีค่าว่างไม่ได้` }}
                      render={({ field }) => (
                        <textarea
                          rows={2}
                          className="text-black py-2 px-4 w-full bg-transparent resize-none focus:outline-none focus:right-0"
                          {...field}
                          onKeyDown={() => setSaveAble(true)}
                        />
                      )}
                    />
                  </div>
                  {errorMessage && (
                    <p className="text-sm font-normal text-red-500">
                      {errorMessage}
                    </p>
                  )}
                </label>
              );
            })}
          </div>
          <ul className="w-full flex flex-col-reverse md:flex-row justify-start md:justify-end gap-4 md:gap-6 mt-10">
            <li>
              <button
                onClick={() => handleGoBack()}
                type="button"
                className="px-4 py-2 text-base font-medium bg-red-700 hover:bg-opacity-80 rounded-lg w-full md:w-[120px] text-center"
              >
                กลับ
              </button>
            </li>
            <li>
              <button
                type="button"
                className="px-4 py-2 text-base font-medium bg-[#626161] hover:bg-opacity-80 rounded-lg w-full md:w-[130px]"
                onClick={() => handleResetSettings()}
              >
                รีเซตค่าเริ่มต้น
              </button>
            </li>
            <li>
              <button
                disabled={!saveAble}
                className="px-4 py-2 text-base font-medium disabled:bg-[#626161] disabled:bg-opacity-50 bg-green-700 rounded-lg w-full md:w-[120px] text-center hover:bg-opacity-80"
              >
                บันทึก
              </button>
            </li>
          </ul>
        </form>
      </main>
    </div>
  );
}

export default page;
