import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  //  */ Liste des membres de l'équipe

  members= [
    {
      name: 'Benjamin Ohandja',
      role: 'Chef de groupe'
    },
    {
      name: 'Benjamin Ohandja',
      role: 'Chef de groupe'
    },
    {
      name: 'Benjamin Ohandja',
      role: 'Chef de groupe'
    },
    {
      name: 'Benjamin Ohandja',
      role: 'Chef de groupe'
    }

  ]
  services= [
    {
      title: 'gratuite et Libre',
      description: "Il s'agit d'une application produite dans le cadre d'un TP, donc à la fin le code sera disponible sur GitHub pour tous"
    },
    {
      title: 'Évolutive & Porgressive',
      description: "Cet application ne cessera d'évoluer et d'acroitre en qualité afin de répondre à un réel besoin dans le quotidien."
    }
  ]
  questions= [
    {
      title: "Qui Peut utiliser l'application ?",
      description: " Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio, nam dolore? Voluptates expedita saepe exercitationem aspernatur similique necessitatibus et esse voluptatum quibusdam in, ad unde harum eaque officia aliquid! Dolorum?"
    },
    {
      title: "Comment Utiliser ?",
      description: " Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio, nam dolore? Voluptates expedita saepe exercitationem aspernatur similique necessitatibus et esse voluptatum quibusdam in, ad unde harum eaque officia aliquid! Dolorum?"
    },
    {
      title: "Comment contribuer ?",
      description: " Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio, nam dolore? Voluptates expedita saepe exercitationem aspernatur similique necessitatibus et esse voluptatum quibusdam in, ad unde harum eaque officia aliquid! Dolorum?"
    },
    {
      title: "C'est gratuit ?",
      description: " Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio, nam dolore? Voluptates expedita saepe exercitationem aspernatur similique necessitatibus et esse voluptatum quibusdam in, ad unde harum eaque officia aliquid! Dolorum?"
    }
  ]
}
