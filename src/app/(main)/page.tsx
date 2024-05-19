import {MainPageButton} from "@/app/components/main-page-button";

export default function Home() {
  return (
      <div
          className={"relative z-0 flex flex-col bg-cover bg-[url('/static/img/Alsatian_wines_in_a_supermarket.jpg')] min-h-[90dvh] md:min-h-[91.5dvh]"}>
          <div className=" h-full w-full flex grow flex-col max-md:backdrop-blur-sm md:main-div-bg md:text-right">
              <main
                  className={"flex-auto self-end h-full flex flex-col justify-center w-full text-white text-center md:text-black md:text-right md:w-3/5 md:mr-5 xl:mr-20"}>
                  <div className={"mb-10"}>
                      <h1 className={"font-bold mb-5 text-4xl md:text-6xl"}>와인추천서비스</h1>
                      <p className={"text-lg md:text-xl font-medium"}>간단한 테스트를 통해 성향에 맞는 와인을 찾아보세요</p>
                  </div>
                  <MainPageButton />
                  <p className={"mt-10 w-4/5 max-md:mx-auto md:ml-auto md:w-3/5"}>
                      이미지 저작권 정보: <span lang={"en"}><a className={"hover:underline-offset-1"} href="https://commons.wikimedia.org/wiki/File:Alsatian_wines_in_a_supermarket.jpg">francois from Strasbourg, france</a>, <a href="https://creativecommons.org/licenses/by/2.0">CC BY 2.0</a>, via Wikimedia Commons</span>
                  </p>
              </main>
              <footer className={"text-white text-center mb-1 md:mr-3 md:text-black md:text-right"}>
                  개인정보처리방침
              </footer>
          </div>
      </div>
  );
}
