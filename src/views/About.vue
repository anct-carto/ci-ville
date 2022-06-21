<template>
  <div class="row">
    <div class="col-7">
      <h3>Quelles sont les données représentées ?</h3>
      <p>
        Les données sont issues des systèmes d'information de l'État.
        Elles représentent le montant financé sous forme de subvention par le programme 147 - politique de la ville,
        les actions déployées ainsi que les tiers concernés. Les postes adultes relais et Fonjep ne sont pas représentés.
      </p>
      <p>
        Les cercles figurant sur les cartes sont proportionnels au montant octroyé.
      </p>
      <p>
        La liste des actions financées permet également d'avoir accès au nom et aux porteurs des projets.
      </p>
      <p>
        Le nombre d’habitants en QPV est à comprendre comme étant la population municipale vivant en QPV au dernier recensement de la population de l'Insee (RP 2018, recensement exhaustif de 2017 pour Mayotte). 
        <br>
        Sur la visualisation, ce chiffre ne varie qu'en fonction du territoire sélectionné et n'est en quelconque manière dépendant du filtre "pilier".
      </p>
      <h3>Crédits et licence</h3>
      <p>
        Cet outil de datavisualisation a été développé par le <a href="https://cartotheque.anct.gouv.fr" target="_blank">service cartographie</a> (pôle Analyse et diagnostics territoriaux) de l'ANCT, 
        à la demande et avec l'appui de la <a href="https://agence-cohesion-territoires.gouv.fr/soutien-la-vie-associative-et-mediation-sociale-49" target="_blank">mission Soutien à la vie associative et médiation sociale</a>
      </p>
      <p>
        Les données des subventions politique de la ville sont publiées, sous  Licence Ouverte 2.0, sur 
        <a href="https://www.data.gouv.fr/fr/datasets/subventions-politique-de-la-ville/" target="_blank">data.gouv.fr</a>.
      </p>
      <p>
        Le code source de l'outil est publié sous Licence Ouverte 2.0 sur <a href="https://www.github.com/anct-carto" target="_blank">Github</a>
        et a été écrit en HTML/CSS/Javascript à l'aide des dépendances suivantes : Bootstrap 5.1, Vue.js 3, Chart.js 3.5, Leaflet 1.0.7. 
        <br> Le autres dépendances utilisées consultables sur le dépôt Github.
      </p>
      <h3>Ressources et liens utiles</h3>
      <ul>
        <li>
          Portail de la campagne nationale de demande de subventions politique de la ville (Dauphin): 
          <a href="https://usager-dauphin.cget.gouv.fr/" target="_blank">usager-dauphin.anct.gouv.fr</a> 
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
        Si vous constatez la présence d'un problème technique lors de la navigation sur le site ou une idée d'amélioration, vous pouvez ouvrir un ticket sur <a href="https://www.github.com/anct-carto" target="_blank">Github</a>.
      </p>
    </div>
  </div>
  <div class="footer">
        <!-- <img :src="logo_anct" alt="" id="logo-anct"><br><br> -->
  </div>
</template>

<script>
// import logo_anct from "@/assets/logo_anct.png"

export default {
  name: 'About',
  data() {
    return {
      // logo_anct:logo_anct,
    }
  }
}
</script>

<style>
  .footer {
    display: flex;
    flex-direction: column wrap;
    flex-grow: row;
    justify-content: center;
    margin:20px
  }

  #logo-anct {
    bottom:0px;
    width:300px;
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