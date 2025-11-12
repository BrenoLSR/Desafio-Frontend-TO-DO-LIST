import { useRef, useState, useEffect } from "react";

type TTarefa = {
  id: number;
  titulo: string;
  descricao: string;
  pronto: boolean;
};

function App() {
  const [tarefas, setTarefas] = useState<TTarefa[]>([]);
  const tituloRef = useRef<HTMLInputElement>(null);
  const descricaoRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const tarefasSalvas = localStorage.getItem("tarefas");
    if (tarefasSalvas) {
      setTarefas(JSON.parse(tarefasSalvas));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
  }, [tarefas]);

  const criarTarefa = () => {
    const titulo = tituloRef.current?.value.trim();
    const descricao = descricaoRef.current?.value.trim();

    if (!titulo || !descricao) return alert("Preencha título e descrição!");

    if (titulo.length > 32 || descricao.length > 200) {
      return alert("Título até 32 caracteres e descrição até 200.");
    }

    const novaTarefa: TTarefa = {
      id: Math.random(),
      titulo,
      descricao,
      pronto: false,
    };

    setTarefas([novaTarefa, ...tarefas]);
    tituloRef.current!.value = "";
    descricaoRef.current!.value = "";
  };

  const alternarStatusTarefa = (id: number) => {
    setTarefas(
      tarefas.map((tarefa) =>
        tarefa.id === id ? { ...tarefa, pronto: !tarefa.pronto } : tarefa
      )
    );
  };

  const deletarTarefa = (id: number) => {
    setTarefas(tarefas.filter((tarefa) => tarefa.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-700 flex items-center justify-center px-6">
      <div className="bg-slate-200 p-4 rounded-lg flex flex-col gap-4 w-full max-w-md">
        <h1 className="text-center text-2xl font-bold text-slate-800">
          Lista de Tarefas
        </h1>

        {tarefas.length > 0 && (
          <div className="bg-slate-700 p-2 rounded-md flex flex-col gap-4 max-h-80 overflow-auto">
            {tarefas.map((tarefa) => (
              <div
                key={tarefa.id}
                className="bg-sky-600 rounded-md p-2 flex flex-col sm:flex-row sm:justify-between sm:items-start sm:gap-4"
              >
                <div className="max-w-[70%] wrap-break-word overflow-hidden">
                  <span
                    className={
                      tarefa.pronto
                        ? "line-through font-bold text-emerald-100 wrap-break-word whitespace-normal"
                        : "font-semibold text-white wrap-break-word whitespace-normal"
                    }
                  >
                    {tarefa.titulo}
                  </span>
                  <p className="text-sm text-slate-100 wrap-break-word whitespace-normal">
                    {tarefa.descricao}
                  </p>
                  <p
                    className={`text-xs mt-1 font-semibold ${
                      tarefa.pronto ? "text-emerald-300" : "text-yellow-200"
                    }`}
                  >
                    Status: {tarefa.pronto ? "Concluída" : "Pendente"}
                  </p>
                </div>

                <div className="flex gap-2 mt-2 sm:mt-0 sm:self-end">
                  <button
                    onClick={() => alternarStatusTarefa(tarefa.id)}
                    className={`px-3 py-1 rounded ${
                      tarefa.pronto
                        ? "bg-emerald-800 hover:bg-emerald-900"
                        : "bg-slate-800 hover:bg-slate-900"
                    } text-white text-sm`}
                  >
                    {tarefa.pronto ? "Pendente" : "Concluída"}
                  </button>
                  <button
                    onClick={() => deletarTarefa(tarefa.id)}
                    className="bg-red-800 hover:bg-red-900 px-3 py-1 rounded text-white text-sm"
                  >
                    Deletar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            criarTarefa();
          }}
          className="flex flex-col gap-2"
        >
          <input
            ref={tituloRef}
            placeholder="Título da tarefa"
            maxLength={32}
            required
            className="p-2 rounded border border-slate-400"
          />
          <input
            ref={descricaoRef}
            placeholder="Descrição da tarefa"
            maxLength={200}
            required
            className="p-2 rounded border border-slate-400"
          />
          <button className="bg-emerald-800 hover:bg-emerald-900 text-white py-2 rounded font-semibold">
            Criar tarefa
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;



