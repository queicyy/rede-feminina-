-- Tabela de Regras de Disponibilidade (Availability Rules)
CREATE TABLE public.availability_rules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    type VARCHAR(20) NOT NULL CHECK (type IN ('recurring', 'custom')),
    day_of_week INT CHECK (day_of_week >= 0 AND day_of_week <= 6), -- 0=Domingo, 1=Segunda, etc. Null se for data customizada.
    specific_date DATE, -- Para datas fora do padrão. Null se for recorrente.
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    slot_duration_minutes INT NOT NULL DEFAULT 60, -- Duração de cada slot em minutos
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    CONSTRAINT check_recurring_or_custom CHECK (
        (type = 'recurring' AND day_of_week IS NOT NULL AND specific_date IS NULL) OR
        (type = 'custom' AND specific_date IS NOT NULL AND day_of_week IS NULL)
    ),
    CONSTRAINT start_before_end CHECK (start_time < end_time)
);

-- Tabela de Agendamentos Pendentes/Aprovados (Presentation Bookings)
CREATE TABLE public.presentation_bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    responsible_name VARCHAR(255) NOT NULL,
    company_name VARCHAR(255),
    email VARCHAR(255) NOT NULL,
    whatsapp VARCHAR(20) NOT NULL,
    description TEXT NOT NULL,
    scheduled_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    rejection_reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    CONSTRAINT start_before_end_booking CHECK (start_time < end_time)
);

-- Função RPC (Stored Procedure) para listar horários ocupados num dia para validar disponibilidade
CREATE OR REPLACE FUNCTION get_occupied_slots(target_date DATE)
RETURNS TABLE (start_t TIME, end_t TIME) AS $$
BEGIN
  RETURN QUERY
  SELECT start_time, end_time
  FROM public.presentation_bookings
  WHERE scheduled_date = target_date AND status IN ('pending', 'approved');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
