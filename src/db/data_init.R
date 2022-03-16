## Mise en forme données - noms colonnes, catégories
## HC, service carto de l'ANCT - 03/2022


# 0. Init ------------------

library(jsonlite)
library(readxl)
library(sf)
library(dplyr)
library(stringr)
library(DBI)
library(RSQLite)

# 1. Lecture ------------------

setwd("Documents/dev/vie-associative/src/db/")

actions_init <- read_excel("2020_-_base_37460_actions_avec_beneficiaires.xlsx") 

# BDD admin
con <- dbConnect(SQLite(),"N:/Transverse/Donnees_Obs/Donnees_SIG/ADMIN_STAT/map-process/public/france/2021/attributes-data/ngeo-fr-cog2021.sqlite3")
com <- dbGetQuery(con,"SELECT insee_com, lib_com, ngeo.insee_dep, ngeo.insee_reg, departement.lib_dep, region.lib_reg FROM ngeo
                      JOIN departement ON ngeo.insee_dep = departement.insee_dep
                      JOIN region ON ngeo.insee_reg = region.insee_reg")
dbGetQuery(con,
           "SELECt * FROM region")
dbDisconnect(con)


# 2. Traitement ------------------

# transformation colonne en miniscule et sans espace
actions_temp <- actions_init %>% 
  rename_all(make.names) %>% 
  rename_all(tolower) 

# selection et renommage des colonnes qui nous intéressent :
# id action
# nom action
# raison_sociale de la structure qui l'a déployée
# type de structure
# codes et libellés de territoire
# thème et sous thème
# montant engagé

actions <- actions_temp %>% 
  select(n.,
         numéro.de.l.action.prj,
         libellé.de.l.action,
         raison.sociale.longue,
         type.de.tiers,
         code.contrat.ville,
         libellé.contrat.ville,
         thème,
         sous.thèmes,
         mt.engagé) %>% 
  rename(id_action = numéro.de.l.action.prj, 
         lib_action= libellé.de.l.action,
         raison_sociale = raison.sociale.longue, 
         type_tiers = type.de.tiers,
         code_cv=code.contrat.ville,
         lib_cv=libellé.contrat.ville,
         theme=thème,sous_theme=sous.thèmes,
         montant=mt.engagé) %>% 
  # distinction par échelle
  mutate(echelle = case_when(
                      str_detect(code_cv,"CV") == T ~ "cdv",
                      str_detect(n.,"DJ") == T ~ "reg",
                      str_detect(n.,"DJ") == F & str_detect(n.,"XX") == F  ~ "dep",
                      str_detect(n.,"XX") == T ~ "nat"
                  ),
         insee_code = ifelse(nchar(n.)==1,
                            paste0("0",n.),
                            n.),
         # assignation du code en fonction de l'échelon
         codgeo = case_when(
           echelle == "cdv" ~ code_cv,
           echelle %in% c("dep","reg") ~ str_remove(insee_code,"DJ"),
         ),
         # nettoyage des noms des actions : suppression 
         # de l'année 
         # du code géographique dep ou reg
         # du nom du territoire 
         # lib_action2 = str_remove_all(lib_action,
         #                              paste("2020",lib_cv,collapse = "|"))

    ) %>% 
  select(-insee_code, -n.)

unique(actions$code)

group_by(actions,echelle) %>% 
  count()

# 3. Ecriture ------------------

actions_json <- toJSON(actions,pretty = TRUE)
write(actions_json,"../assets/actions-2020.json")

# write.csv(actions,"../assets/actions_2020.csv",row.names = F,fileEncoding="UTF-8")    
