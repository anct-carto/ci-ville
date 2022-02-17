library(tidyverse)


data_init <- read.csv("actions-vie-associatives/src/assets/actions_2020.csv",fileEncoding = "utf-8")


lvl1 <- data_init %>% 
  group_by(sous_theme) %>% 
  summarise(nb_theme = n()) %>% 
  ungroup() %>% 
  mutate(level = 1) 


ggplot(lvl1,aes(x=sous_theme,y=nb_theme)) + 
  geom_bar(stat="identity") +
  coord_flip()

data_init %>% 
  group_by(type_tiers) %>% 
  summarise(nb=n()) %>% 
  ggplot(aes(x=type_tiers,y=nb)) +
  geom_bar(stat="identity") +
  coord_flip()
