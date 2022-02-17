

setwd("Documents/dev/cdv_vis/src/db/")

library(jsonlite)
library(readxl)
library(sf)
library(dplyr)

actions_init <- read_excel("2020_-_base_37460_actions_avec_beneficiaires.xlsx") 

cdv_geom <- st_read("cv_nb_projets.gpkg") %>% 
  select(code_cv,lib_cv) %>% 
  st_transform(4326)


actions_temp <- actions_init %>% 
  rename_all(make.names) %>% 
  rename_all(tolower) 

actions <- actions_temp %>% 
  select(numéro.de.l.action.prj,
         libellé.de.l.action,
         raison.sociale.longue,
         type.de.tiers,
         code.contrat.ville,
         libellé.contrat.ville,
         thème,
         sous.thèmes,
         mt.engagé,
         région) %>% 
  rename(id_action = numéro.de.l.action.prj, lib_action= libellé.de.l.action,
         raison_sociale = raison.sociale.longue, type_tiers = type.de.tiers,
         code_cv=code.contrat.ville,lib_cv=libellé.contrat.ville,
         theme=thème,sous_theme=sous.thèmes,
         echelle=région,
         montant=mt.engagé) 

actions_json <- toJSON(actions)

write_json(actions_json,"../assets/actions_financees2.json")

st_write(cdv_geom,"../assets/cv_geom.geojson",delete_dsn = T)


write.csv(actions,"../assets/actions_2020.csv",row.names = F,fileEncoding="UTF-8")    
