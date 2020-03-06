// Base a ser utilizada
let alunosDaEscola = [{ nome: "Henrique", notas: [], cursos: [], faltas: 5 }, { nome: "Edson", notas: [], cursos: [], faltas: 2 }, { nome: "Bruno", notas: [10, 9.8, 9.6], cursos: [], faltas: 0 }, { nome: "Guilherme", notas: [10, 9.8, 9.6], cursos: [{ nomeDoCurso: "Full Stack", dataMatricula: new Date }, { nomeDoCurso: "Full Stack", dataMatricula: new Date }], faltas: 0 }, { nome: "Carlos", notas: [], cursos: [], faltas: 0 }, { nome: "Lucca", notas: [10, 9.8, 9.6], cursos: [{ nomeDoCurso: "UX", dataMatricula: new Date }], faltas: 0 }];


function adicionarAluno(aluno) {
  const matricula = {
    nome: "Henrique",
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
    return acc += `\nDetalhe do Aluno ${id+1}\nNome: ${cur.nome}\nNotas:
    ${cur.notas.reduce(exibeNotas, '') || 'Não há notas cadastradas.'}\nCursos: 
    ${cur.cursos.reduce(exibeCursos, '') || 'Este aluno não foi matriculado em nenhum curso ainda.'}\nFaltas: ${cur.faltas}\n===============================`;

  }, `===============================\n`);
}

// console.log(listarAlunos());

function buscarAluno(nome){
  const [aluno] = alunosDaEscola.filter(aluno => aluno.nome === nome);
  console.log(!aluno ? 'Aluno não encontrado' : `O aluno ${nome} foi encontrado!`);
  return aluno;
}

// console.log(buscarAluno('Guilherme'));
