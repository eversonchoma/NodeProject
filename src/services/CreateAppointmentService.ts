import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

import { startOfHour } from 'date-fns';


/**
 * precisamos realizar os seguintes passos:
 * 1. Receber informações
 * 2. tratar os erros e exceções
 * 3. acessar o repositório
 */

interface RequestDTO{
    provider: string;
    date: Date;
}

class CreateAppointmentService {
    private appointmentsRepository: AppointmentsRepository

    constructor(appointmentsRepository: AppointmentsRepository){
        this.appointmentsRepository = appointmentsRepository;
    }

    public execute({ provider, date}: RequestDTO): Appointment {
        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = this.appointmentsRepository.findBydate(appointmentDate);

        if (findAppointmentInSameDate){ 
            throw Error('This appointment is already booked.');
        }

        const appointment = this.appointmentsRepository.create({ 
            provider, 
            date: appointmentDate,
        });

        return appointment;
    }
}

export default CreateAppointmentService;