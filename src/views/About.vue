<template>
  <div class="row">
    <div class="col-9">
      <h3>Qu'est-ce que Ci.Ville ?</h3>
      <p>
        L’État attribue annuellement des subventions à des porteurs de projets œuvrant en faveur des habitants des quartiers prioritaires de la politique de la ville. Les cartes interactives permettent de visualiser, par année, la répartition géographique et thématique de ces subventions.
      </p>
      <p>
        Quatre échelles géographiques sont proposées :
        <ul>
          <li>
            nationale : les valeurs représentent les subventions d'actions à dimension nationale ;
          </li>
          <li>
            régionale : les valeurs agrègent les crédits affectés aux contrats de ville d'une région, ainsi que les crédits hors contrat de ville ;
          </li>
          <li>
            départementale : les valeurs agrègent les crédits affectés aux contrats de ville du département, ainsi que les crédits hors contrat de ville ;
          </li>
          <li>
            échelle du contrat de ville : les valeurs agrègent les crédits affectés à un contrat de ville.
          </li>
        </ul>
      </p>
      <h3>Quelles sont les données représentées ?</h3>
      <p>
        Les données sont issues des systèmes d'information de l'État, de l'ASP et du Fonjep. 
        Elles représentent le montant financé sous forme de subvention par le programme 147 - politique de la ville, les actions déployées ainsi que les tiers concernés. 
      </p>
      <p>Les aides aux postes Fonjep sont matérialisées par les effectifs présents au 31/12/N  enregistrés à date avec les coûts (théoriques) associés.
        <br>Les aides aux postes adultes-relais  correspondent aux conventions signées et actives au 31/12/N  enregistrées  à l'ASP à date avec les coûts (théoriques) associés. 
        Ces postes ne sont pas toujours pourvus (vacances liées au délai de recrutement par exemple). De plus, il peut s'agir de poste à temps partiel et non à temps plein.
      </p>
      <p>
        Les cercles figurant sur les cartes sont proportionnels au montant de subventions octroyé.
      </p>
      <p>
        La liste des actions financées permet d’accéder au libellé des actions ainsi qu’au nom des porteurs de projet.
      </p>
      <p>
        Le nombre d’habitants en QPV est à comprendre comme étant la population municipale vivant en QPV au dernier recensement de la population de l'Insee (RP 2018, recensement exhaustif de 2017 pour Mayotte). 
        Sur la visualisation, ce chiffre ne varie qu'en fonction du territoire sélectionné et n'est en aucune  manière dépendant du filtre "pilier".
      </p>
      <!-- titres à changer "programme 147" => "crédits de la politique de la ville" -->
      <!-- <CartesStatiques/> -->
      <h3>Crédits et licence</h3>
      <p>
        Cet outil de datavisualisation a été développé par le <a href="https://cartotheque.anct.gouv.fr" target="_blank">service cartographie</a> de l'ANCT, 
        à la demande et avec l'appui de la <a href="https://agence-cohesion-territoires.gouv.fr/soutien-la-vie-associative-et-mediation-sociale-49" target="_blank">mission Soutien à la vie associative et médiation sociale</a>.
      </p>
      <p>
        Les données des subventions politique de la ville sont publiées, sous  Licence Ouverte 2.0, sur 
        <a href="https://www.data.gouv.fr/fr/datasets/subventions-politique-de-la-ville/" target="_blank">data.gouv.fr</a>.
      </p>
      <p>
        Le code source de l'outil est publié sous Licence Ouverte 2.0 sur <a href="https://www.github.com/anct-carto/ci-ville" target="_blank">Github</a>
        et a été écrit en HTML/CSS/Javascript à l'aide des librairies 
        Bootstrap 5.1, Vue.js 3, Chart.js 3.5, Leaflet 1.0.7. Les autres dépendances sont consultables sur le dépôt Github.
      </p>
      <h3>Ressources et liens utiles</h3>
      <ul>
        <li>
          Portail de la campagne nationale de demande de subventions politique de la ville (Dauphin): 
          <a href="https://usager-dauphin.cget.gouv.fr/" target="_blank">usager-dauphin.anct.gouv.fr</a> 
        </li>
        <li>
          Plateforme collaborative de La Grande équipe : 
          <a href="https://acteurs.lagrandeequipe.fr/" target="_blank">acteurs.lagrandeequipe.fr</a> 
        </li>
        <li>
          Système d'information géographique de la politique de la ville (SIG Ville) :
          <a href="http://sig.ville.gouv.fr" target="_blank">sig.ville.gouv.fr</a>
        </li>
        <li>
          Observatoire national de la politique de la ville : <a href="http://www.onpv.fr" target="_blank">onpv.fr</a>
        </li>
        <li>
          Cartothèque de l'ANCT : <a href="https://cartotheque.anct.gouv.fr" target="_blank">cartotheque.anct.gouv.fr</a>
        </li>
        <li>
          Téléchargement des données : <a href="https://www.data.gouv.fr/fr/datasets/subventions-politique-de-la-ville/" target="_blank">data.gouv.fr</a>
        </li>
      </ul>
      <h3>Des questions ? Des suggestions ?</h3>
      <p>
        Pour toute question relative aux données, vous pouvez contacter l'équipe de la mission Soutien à la vie associative et à la médiation sociale : <a href="mailto:mission.soutienvieassociative@anct.gouv.fr">mission.soutienvieassociative@anct.gouv.fr</a> 
      </p>
      <p>
        Si vous constatez la présence d'un problème technique lors de la navigation sur le site ou une idée d'amélioration, vous pouvez ouvrir un ticket sur <a href="https://www.github.com/anct-carto/ci-ville" target="_blank">Github</a>.
      </p>
    </div>
  </div>
</template>

<script>
// import CartesStatiques from "@/components/CartesStatiques.vue";


export default {
  name: 'About',
  // components: { CartesStatiques },
}
</script>

<style scoped>
  .row {
    font-size: 1.15rem !important;
    padding-left:25px
  }

  h3 {
    margin-top:20px;
    font-family: 'Marianne-Bold';
  }

  li {
    list-style: square !important;
  }

  a {
    color:var(--rose-gerr);
    text-decoration: none;
  }

  a:hover {
    color:var(--rose-gerr);
    text-decoration: underline;
  }


</style>