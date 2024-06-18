import { ProjectCard } from "../ProjectCard";

// import Swiper core and required modules
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation'
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
//import os dados dos projetos
import { projectData_pt } from "@/assets/data/projectsData-pt";
import { projectData_en } from "@/assets/data/projectsData-en";


export const Projects = () => {
  //função para pegar o tamanho da tela e retornar a quantidade dos cards
  const getSlidesPerView = () => {
    if (window.innerWidth > 1720) {
      
      return 4;
    } else if (window.innerWidth > 1000) {
      return 3;
    } else if (window.innerWidth > 600) {
      return 2;
    } else {
      return 1;
    }
  };

  //useState para a quantidade de cards  que seram mostrados 
  const [slidesPerView, setSlidesPerView] = useState(getSlidesPerView());

  //effect para fazer a mudança quantidade de cards toda vez que  o tamanho da tela mudar
  useEffect(() => {
    const handleResize = () => {
      setSlidesPerView(getSlidesPerView());
    };

    window.addEventListener('resize', handleResize);

    //cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  //faz a troca do idioma dos cards de experiencia
  const { t } = useTranslation();
   
  let currentProjectData;
  t("current-language.locale")=="pt"?currentProjectData=projectData_pt:projectData_en;
 

  return (
    <div className="h-auto py-8 flex flex-col items-center w-full">
      <div className="h-dvh w-full">
        <h1 className="text-4xl px-10 font-bold text-left">Projetos</h1>
        <h6 className="pt-5 px-10 text-base text-left">
          Esses são alguns dos meus projetos pessoais que estão disponíveis no GitHub, ao clicar na imagem você será redirecionado para o site do projeto e ao clicar no titulo você irá para o repositorio.
        </h6>
        <div className="flex justify-center mr-28 items-center w-full mt-6">
          <Swiper
            modules={[Navigation,Pagination, EffectCoverflow]}
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            slidesPerView={slidesPerView}
            pagination={{ el: '.swiper-pagination', clickable: true }}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 4.5,
            }}
            

          >
            {
               currentProjectData?.map((projectData)=>(
                <SwiperSlide>
                  <ProjectCard id={projectData.id} title={projectData.title} description={projectData.description} linkGithub={projectData.linkGithub}
                   usedtechnologies={projectData.usedtechnologies} imageProject={projectData.imageProject} urlProject={projectData.urlProject} />
                </SwiperSlide>
               ))
              
            }
            
            <div className="relative slider-controler flex flex-row justify-center items-center gap-2 mt-5 w-full h-8">
              <div className="absolute swiper-pagination"></div>
            </div>
          </Swiper>
        </div>
      </div>
    </div>
  );
};


