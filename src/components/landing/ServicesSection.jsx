import React from 'react';

import { Grid, Button } from '@material-ui/core';

import ChartIcon from '@material-ui/icons/InsertChartOutlined';

const services = [
  {
    icon: <ChartIcon className="service-icon" />,
    title: 'Gestion de clients',
    description: 'Construisez votre base de données Clients et gérer les différents projets pour chcun d\'entre eux',
  }, {
    icon: <ChartIcon className="service-icon" />,
    title: 'Gestion des CRA',
    description: 'Saisissez votre activité quotidienne par projet, et suivez l\'évolution de votre activité mois par mois',
  }, {
    icon: <ChartIcon className="service-icon" />,
    title: 'Gestion de la facturation',
    description: 'Générez vos facture directement à partir de vos CRA ou créez simplement des factures manuelles',
  },
];

const ServicesSection = () => {

  return (
    <section className="section-grey section-top-border" id="services">
      <div className="container">
        <Grid container spacing={5}>
          <Grid item md={6} style={{ paddingTop: '30px' }}>
            {services.map((service, serviceIndex) => (
              <div key={serviceIndex} className="features-second">
                <div className="dropcaps-circle">
                  {service.icon}
                </div>
                <h4>{service.title}</h4>
                <p>{service.description}</p>
              </div>
            ))}
          </Grid>

          <Grid item md={6}>
            <img src="http://demo.epic-webdesign.com/tf-essentials/v1/images/img10.png" className="box-shadow" style={{ width: '100%' }} />
          </Grid>
        </Grid>
      </div>

    </section>
  );
}

export default ServicesSection;
