// Base a ser utilizada
let alunosDaEscola = [{ nome: "Henrique", notas: [], cursos: [], faltas: 5 }, { nome: "Edson", notas: [], cursos: [], faltas: 2 }, { nome: "Bruno", notas: [10, 9.8, 9.6], cursos: [], faltas: 0 }, { nome: "Guilherme", notas: [10, 9.8, 9.6], cursos: [{ nomeDoCurso: "Full Stack", dataMatricula: new Date }], faltas: 0 }, { nome: "Carlos", notas: [], cursos: [], faltas: 0 }, { nome: "Lucca", notas: [10, 9.8, 9.6], cursos: [{ nomeDoCurso: "UX", dataMatricula: new Date }], faltas: 0 }];


function adicionarAluno(aluno) {
  const matricula = {
    nome: "",
    notas: [],
    cursos: [],
    faltas: 0
  };
  alunosDaEscola = alunosDaEscola.concat({ ...matricula, nome: aluno });
  return `A matricula de ${aluno} foi feita com sucesso.`;
}

// console.log(adicionarAluno('Paula'));

const exibeNotas = (notas, nota, i) => notas += `Nota ${i + 1}: ${nota} | `;
const exibeCursos = (cursos, curso) => cursos += `Nome do curso: ${curso.nomeDoCurso} | Matriculado em: ${curso.dataMatricula.toLocaleDateString()}\n\u0020\u0020\u0020\u0020`;

function listarAlunos() {
  return alunosDaEscola.reduce((acc, cur, id) => {
    return acc += `\nDetalhe do Aluno ${id + 1}\nNome: ${cur.nome}\nNotas:
    ${cur.notas.reduce(exibeNotas, '') || 'Não há notas cadastradas.'}\nCursos: 
    ${cur.cursos.reduce(exibeCursos, '') || 'Este aluno não foi matriculado em nenhum curso ainda.'}\nFaltas: ${cur.faltas}\n===============================`;

  }, `===============================\n`);
}

// console.log(listarAlunos());

function buscarAluno(nome) {
  const [aluno] = alunosDaEscola.filter(aluno => aluno.nome === nome);
  console.log(!aluno ? 'Aluno não encontrado' : `O aluno ${nome} foi encontrado!`);
  return aluno;
}

// console.log(buscarAluno('Guilherme'));

const acharAluno = (aluno) => alunosDaEscola.find(a => JSON.stringify(a) === JSON.stringify(aluno));

function matricularAluno(aluno, curso) {
  const alunoEncontrado = acharAluno(aluno);
  if (alunoEncontrado) {
    const estaMatriculado = alunoEncontrado.cursos.some(c => c.nomeDoCurso === curso);
    if (!estaMatriculado) {
      alunosDaEscola = alunosDaEscola.map(a => {
        if (a.nome === alunoEncontrado.nome) {
          return a = {
            ...alunoEncontrado,
            cursos: [
              ...alunoEncontrado.cursos,
              { nomeDoCurso: curso, dataMatricula: new Date() }
            ]
          };
        }
        return a;
      });
      return `${alunoEncontrado.nome} foi matriculado em ${curso} com sucesso.`;
    }
    return `${alunoEncontrado.nome} já está matriculado em ${curso}.`; return ``
  }
  return `Aluno não encontrado no sistema`;
}

// console.log(matricularAluno(alunosDaEscola[4], 'Design'));
// console.log(alunosDaEscola[4]);
// console.log(matricularAluno(alunosDaEscola[3], 'Full Stack'));
// console.log(matricularAluno(alunosDaEscola[30], 'Design'));
// console.log(alunosDaEscola[3]);

function aplicarFalta(aluno) {
  if(aluno){
    if (aluno.cursos.length) {
      alunosDaEscola = alunosDaEscola.map(a => {
        if (a.nome === aluno.nome) {
          return a = { ...aluno, faltas: ++a.faltas };
        }
        return a;
      });
      return `A falta de ${aluno.nome} foi aplicada com sucesso. Atualmente o aluno possui ${aluno.faltas} ${aluno.faltas === 1 ? 'falta' : 'faltas'}.`;
    }
    return 'Esse aluno não está matriculado em nenhum curso.';
  }
  return 'Aluno não cadastrado no sistema.';
}

// console.log(alunosDaEscola[3]);
// console.log(aplicarFalta(alunosDaEscola[3]));
// console.log(aplicarFalta(alunosDaEscola[3]));
// console.log(aplicarFalta(alunosDaEscola[4]));
// console.log(aplicarFalta(alunosDaEscola[30]));
// console.log(alunosDaEscola[3]);

function aplicarNota(aluno, nota) {
  let alunoEncontrado = acharAluno(aluno);
  if (alunoEncontrado) {
    if (alunoEncontrado.cursos.length) {
      alunosDaEscola = alunosDaEscola.map(a => {
        if (a.nome === alunoEncontrado.nome) {
          return {
            ...alunoEncontrado,
            notas: [...alunoEncontrado.notas, nota]
          };
        }
        return a;
      });
      return `${alunoEncontrado.nome} recebeu nota ${nota}.`;
    }
    return `${alunoEncontrado.nome} não está matriculado em nenhum curso.`;
  }
  return `Aluno não cadastrado no sistema.`;
};

// console.log(aplicarNota(alunosDaEscola[3], 5));
// console.log(aplicarNota(alunosDaEscola[30], 10));
// console.log(aplicarNota(alunosDaEscola[4], 6));
// console.log(alunosDaEscola)

function aprovarAluno(aluno) {
  const alunoEncontrado = acharAluno(aluno);
  if (alunoEncontrado) {
    const { cursos, notas, faltas, nome } = alunoEncontrado;
    if (cursos.length) {
      const mediaNotas = (notas.reduce((notas, nota) => notas += nota, 0) / notas.length).toFixed(2);
      return mediaNotas >= 7 && faltas <= 3 ? `${nome} está aprovado(a).` : `${nome} foi reprovado(a).\nNota: ${mediaNotas} (Min: 7) | Faltas: ${faltas} (Máx: 3).`;
    }
    return `${nome} não está matriculado em nenhum curso.`;
  }
  return `Aluno não cadastrado no sistema. Tente novamente.`;
}

// console.log(aprovarAluno(alunosDaEscola[3]));
// console.log(aprovarAluno(alunosDaEscola[30]));
// console.log(aprovarAluno(alunosDaEscola[4]));