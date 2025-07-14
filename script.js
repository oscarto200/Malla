document.addEventListener('DOMContentLoaded', () => {

    // --- Definición de Datos de los Cursos ---
    // status puede ser: 'locked', 'available', 'approved'
    const coursesData = [
        // Ciclo I
        { id: 'EG-', name: 'CURSO DE ARTE', cycle: 1, credits: 2, req: [], coreq: [] },
        { id: 'EG-I', name: 'CURSO INTEGRADO DE HUMANIDADES I', cycle: 1, credits: 6, req: [], coreq: [] },
        { id: 'IC0101', name: 'TALLER DE INTRODUCCIÓN A LA INGENIERÍA', cycle: 1, credits: 3, req: [], coreq: [] },
        { id: 'MA0001', name: 'PRECÁLCULO', cycle: 1, credits: 0, req: [], coreq: [] },
        { id: 'MA1001', name: 'CÁLCULO I', cycle: 1, credits: 3, req: ['MA0001'], coreq: [] },
        { id: 'RP-1', name: 'REPERTORIO', cycle: 1, credits: 3, req: [], coreq: [] },
        // Ciclo II
        { id: 'EF-', name: 'ACTIVIDAD DEPORTIVA', cycle: 2, credits: 0, req: [], coreq: [] },
        { id: 'EG-II', name: 'CURSO INTEGRADO DE HUMANIDADES II', cycle: 2, credits: 6, req: ['EG-I'], coreq: [] },
        { id: 'FS0210', name: 'FÍSICA GENERAL I', cycle: 2, credits: 3, req: ['MA1001'], coreq: ['FS0211'] },
        { id: 'FS0211', name: 'LABORATORIO DE FÍSICA GENERAL I', cycle: 2, credits: 1, req: ['MA1001'], coreq: ['FS0210'] },
        { id: 'MA1002', name: 'CÁLCULO II', cycle: 2, credits: 4, req: ['MA1001'], coreq: [] },
        { id: 'QU0114', name: 'QUÍMICA GENERAL INTENSIVA', cycle: 2, credits: 4, req: [], coreq: ['QU0115'] },
        { id: 'QU0115', name: 'LABORATORIO DE QUÍMICA GENERAL INTENSIVA', cycle: 2, credits: 1, req: [], coreq: ['QU0114'] },
        // Ciclo III
        { id: 'CI0202', name: 'PRINCIPIOS DE INFORMÁTICA', cycle: 3, credits: 4, req: [], coreq: [] }, // MA0205 no está en la malla
        { id: 'FS0310', name: 'FÍSICA GENERAL II', cycle: 3, credits: 3, req: ['FS0210', 'FS0211', 'MA1002'], coreq: ['FS0311'] },
        { id: 'FS0311', name: 'LABORATORIO DE FÍSICA GENERAL II', cycle: 3, credits: 1, req: ['FS0210', 'FS0211', 'MA1002'], coreq: ['FS0310'] },
        { id: 'IC0302', name: 'DISEÑO GRÁFICO', cycle: 3, credits: 3, req: ['IC0101', 'MA1002'], coreq: [] },
        { id: 'MA1003', name: 'CÁLCULO III', cycle: 3, credits: 4, req: ['MA1002'], coreq: [] },
        { id: 'MA1004', name: 'ÁLGEBRA LINEAL', cycle: 3, credits: 3, req: ['MA1002'], coreq: [] }, // Requisito inferido
        // Ciclo IV
        { id: 'FS0410', name: 'FÍSICA GENERAL III', cycle: 4, credits: 3, req: ['FS0310', 'FS0311', 'MA1003'], coreq: ['FS0411'] },
        { id: 'FS0411', name: 'LABORATORIO DE FÍSICA GENERAL III', cycle: 4, credits: 1, req: ['FS0310', 'FS0311'], coreq: ['FS0410'] }, // MA0450 no está en la malla
        { id: 'IC0401', name: 'ESTÁTICA', cycle: 4, credits: 4, req: ['FS0310', 'IC0302', 'MA1003'], coreq: [] },
        { id: 'IC0403', name: 'COMUNICACIÓN TÉCNICA', cycle: 4, credits: 3, req: ['IC0302'], coreq: [] },
        { id: 'IC0410', name: 'SEMINARIO DE ÉTICA, INGENIERÍA Y SOCIEDAD', cycle: 4, credits: 1, req: [], coreq: ['IC0403'] },
        { id: 'IT0001', name: 'FUNDAMENTOS DE INGENIERÍA TOPOGRÁFICA', cycle: 4, credits: 3, req: ['IC0302'], coreq: [] },
        { id: 'MA1005', name: 'ECUACIONES DIFERENCIALES', cycle: 4, credits: 4, req: ['MA1002', 'MA1004'], coreq: [] },
        // Ciclo V
        { id: 'IC0502', name: 'DINÁMICA', cycle: 5, credits: 3, req: ['FS0410', 'IC0401', 'MA1005'], coreq: [] },
        { id: 'IC0510', name: 'MECÁNICA DEL SÓLIDO I', cycle: 5, credits: 4, req: ['IC0401', 'MA1005', 'QU0114'], coreq: [] },
        { id: 'IC0516', name: 'PROBABILIDAD Y ESTADÍSTICA APLICADA', cycle: 5, credits: 3, req: ['CI0202', 'MA1005'], coreq: [] },
        { id: 'MA1006', name: 'INTRODUCCIÓN AL ANÁLISIS NUMÉRICO', cycle: 5, credits: 4, req: ['CI0202', 'MA1005'], coreq: [] },
        { id: 'XE0156', name: 'INTRODUCCIÓN A LA ECONOMÍA', cycle: 5, credits: 4, req: [], coreq: [] },
        // Ciclo VI
        { id: 'IC0604', name: 'MATERIALES DE CONSTRUCCIÓN', cycle: 6, credits: 3, req: ['IC0510'], coreq: [] },
        { id: 'IC0605', name: 'MECÁNICA DE FLUIDOS', cycle: 6, credits: 3, req: ['IC0502', 'MA1006'], coreq: [] },
        { id: 'IC0607', name: 'TALLER DE SISTEMAS DE INGENIERÍA', cycle: 6, credits: 4, req: ['IC0403', 'IC0410', 'IC0516'], coreq: [] },
        { id: 'IC0610', name: 'MECÁNICA DEL SÓLIDO II', cycle: 6, credits: 3, req: ['IC0510', 'IC0516'], coreq: [] },
        { id: 'IC0811', name: 'ADMINISTRACIÓN EN INGENIERÍA', cycle: 6, credits: 3, req: ['IC0516', 'XE0156'], coreq: [] },
        { id: 'SR-1', name: 'SEMINARIO DE REALIDAD NACIONAL I', cycle: 6, credits: 2, req: ['EG-II'], coreq: [] },
        // Ciclo VII
        { id: 'IC0701', name: 'ANÁLISIS ESTRUCTURAL', cycle: 7, credits: 3, req: ['IC0610'], coreq: [] },
        { id: 'IC0703', name: 'MECÁNICA DE SUELOS', cycle: 7, credits: 4, req: ['IC0604', 'IC0605', 'IC0610'], coreq: [] },
        { id: 'IC0704', name: 'MÉTODOS CONSTRUCTIVOS I', cycle: 7, credits: 3, req: ['IC0604', 'IT0001'], coreq: [] },
        { id: 'IC0709', name: 'HIDRÁULICA GENERAL', cycle: 7, credits: 3, req: ['IC0605'], coreq: [] },
        { id: 'IC0711', name: 'TRANSPORTES', cycle: 7, credits: 3, req: ['IC0607'], coreq: [] },
        { id: 'IC0712', name: 'FUNDAMENTOS DE INGENIERÍA AMBIENTAL', cycle: 7, credits: 3, req: ['IC0605'], coreq: [] },
        // Ciclo VIII
        { id: 'IC0801', name: 'CONCRETO REFORZADO', cycle: 8, credits: 3, req: ['IC0604', 'IC0701'], coreq: [] },
        { id: 'IC0804', name: 'PROGRAMACIÓN Y PRESUPUESTACIÓN DE OBRA', cycle: 8, credits: 3, req: [], coreq: ['IC0704', 'IC0811'] },
        { id: 'IC0808', name: 'HIDROLOGÍA', cycle: 8, credits: 3, req: ['IC0709', 'IC0712', 'IT0001'], coreq: [] },
        { id: 'IC0809', name: 'INGENIERÍA GEOTÉCNICA', cycle: 8, credits: 3, req: ['IC0703'], coreq: [] },
        { id: 'IC0810', name: 'DISEÑO VIAL', cycle: 8, credits: 3, req: ['IC0703', 'IC0711', 'IT0001'], coreq: [] },
        { id: 'IC1006', name: 'ANÁLISIS DE IMPACTO AMBIENTAL', cycle: 8, credits: 3, req: ['IC0712'], coreq: [] },
        // Ciclo IX
        { id: 'IC0905', name: 'TALLER DE DISEÑO', cycle: 9, credits: 4, req: ['IC0801', 'IC0804', 'IC0808', 'IC0809', 'IC0810', 'IC1006'], coreq: [] },
        { id: 'SR-II', name: 'SEMINARIO DE REALIDAD NACIONAL II', cycle: 9, credits: 2, req: ['SR-1'], coreq: [] },
        { id: 'OPT1119-1', name: 'OPTATIVO 1', cycle: 9, credits: 3, req: ['IC0801','IC0809'], coreq: [] }, // Requisitos genéricos para optativos
        { id: 'OPT1119-2', name: 'OPTATIVO 2', cycle: 9, credits: 3, req: ['IC0801','IC0809'], coreq: [] },
        { id: 'OPT1119-3', name: 'OPTATIVO 3', cycle: 9, credits: 3, req: ['IC0801','IC0809'], coreq: [] },
        // Ciclo X
        { id: 'OPT1119-4', name: 'OPTATIVO 4', cycle: 10, credits: 3, req: ['IC0905'], coreq: [] },
        { id: 'OPT1119-5', name: 'OPTATIVO 5', cycle: 10, credits: 3, req: ['IC0905'], coreq: [] },
        { id: 'OPT1119-6', name: 'OPTATIVO 6', cycle: 10, credits: 3, req: ['IC0905'], coreq: [] },
        { id: 'OPT1119-7', name: 'OPTATIVO 7', cycle: 10, credits: 3, req: ['IC0905'], coreq: [] },
        { id: 'OPT1123', name: 'BLOQUE 0', cycle: 10, credits: 0, req: ['IC0905'], coreq: [] },
        // Ciclo XI
        { id: 'OPT1193', name: 'BLOQUE TFG', cycle: 11, credits: 0, req: ['OPT1123'], coreq: [] },
    ];
    
    // Añadir estado inicial a cada curso desde localStorage o por defecto
    let courses = coursesData.map(course => {
        const savedStatus = localStorage.getItem(course.id);
        return { ...course, status: savedStatus || 'locked' };
    });

    const grid = document.getElementById('course-grid');
    const resetButton = document.getElementById('reset-button');

    // --- Funciones ---

    // Dibuja los cursos en la malla
    const renderCourses = () => {
        // Limpiar columnas
        document.querySelectorAll('.cycle-column').forEach(col => col.innerHTML = '');

        courses.forEach(course => {
            const cycleColumn = document.getElementById(`cycle-${course.cycle}`);
            if (cycleColumn) {
                const courseBox = document.createElement('div');
                courseBox.className = `course-box ${course.status}`;
                courseBox.dataset.id = course.id;

                courseBox.innerHTML = `
                    <div class="course-code">${course.id}</div>
                    <div class="course-name">${course.name}</div>
                    <div class="course-credits">${course.credits} créditos</div>
                `;
                cycleColumn.appendChild(courseBox);
            }
        });
    };

    // Actualiza el estado de los cursos (bloqueado, disponible, aprobado)
    const updateCourseStatuses = () => {
        courses.forEach(course => {
            if (course.status === 'approved') {
                return; // Si ya está aprobado, no cambia
            }

            const allReqsMet = course.req.every(reqId => {
                const reqCourse = courses.find(c => c.id === reqId);
                return reqCourse && reqCourse.status === 'approved';
            });

            const allCoreqsMet = course.coreq.every(coreqId => {
                 const coreqCourse = courses.find(c => c.id === coreqId);
                 // Un co-requisito está 'cumplido' si está aprobado o disponible para cursarse simultáneamente
                 return coreqCourse && (coreqCourse.status === 'approved' || coreqCourse.status === 'available');
            });

            if (allReqsMet && allCoreqsMet) {
                course.status = 'available';
            } else {
                course.status = 'locked';
            }
        });

        renderCourses();
    };

    // Maneja el clic en un curso
    const handleCourseClick = (e) => {
        const courseBox = e.target.closest('.course-box');
        if (!courseBox) return;

        const courseId = courseBox.dataset.id;
        const course = courses.find(c => c.id === courseId);

        if (course && course.status === 'available') {
            course.status = 'approved';
            localStorage.setItem(course.id, 'approved'); // Guardar estado
            updateCourseStatuses();
        }
    };
    
    // Reinicia la malla
    const resetGrid = () => {
        courses.forEach(course => {
            localStorage.removeItem(course.id); // Limpiar almacenamiento
            course.status = 'locked';
        });
        updateCourseStatuses();
    };


    // --- Inicialización y Event Listeners ---
    grid.addEventListener('click', handleCourseClick);
    resetButton.addEventListener('click', resetGrid);

    // Carga inicial
    updateCourseStatuses();
});
